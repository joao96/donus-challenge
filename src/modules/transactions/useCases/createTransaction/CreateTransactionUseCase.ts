import { Transaction, TransactionType } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { IAccountsRepository } from '../../../accounts/repositories/IAccountsRepository';
import { ICreateTransactionDTO } from '../../dtos/ICreateTransactionDTO';
import { ITransactionsRepository } from '../../repositories/ITransactionsRepository';

@injectable()
class CreateTransactionUseCase {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository
  ) {}

  async execute({
    amount,
    recipient_id,
    description,
    sender_id,
    type,
  }: ICreateTransactionDTO): Promise<Transaction> {
    const recipientAccount = await this.accountsRepository.findById(
      recipient_id
    );
    let transactionType: TransactionType = type;

    if (amount <= 0) {
      throw new AppError('Invalid amount value.');
    }

    if (!recipientAccount) {
      throw new AppError('Recipient account not found.');
    }

    if (sender_id && recipient_id !== sender_id) {
      const senderAccount = await this.accountsRepository.findById(sender_id);

      if (!senderAccount) {
        throw new AppError('Sender account not found.');
      }

      if (senderAccount.balance < amount) {
        throw new AppError('Not enough funds.');
      }

      transactionType = TransactionType.TRANSFER;
    }

    if (transactionType === TransactionType.DEPOSIT && amount > 2000) {
      throw new AppError('Exceeded the maximum deposit amount.');
    }

    const transaction = await this.transactionsRepository.create({
      amount,
      recipient_id,
      type: transactionType,
      description,
      sender_id,
    });

    if (transaction.id) {
      if (sender_id && recipient_id !== sender_id) {
        await this.accountsRepository.withdrawal({ amount, id: sender_id });
      }
      await this.accountsRepository.deposit({ amount, id: recipient_id });
    } else {
      throw new AppError('Unable to create transaction.', 500);
    }

    return transaction;
  }
}

export { CreateTransactionUseCase };
