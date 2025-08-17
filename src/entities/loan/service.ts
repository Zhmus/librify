import { RawLoan } from 'entities/loan/types';
import { Loan } from './model';

import { mockServer } from 'shared/utils/mockServer';
import { handleResponse } from 'shared/utils/http/handleResponse';
import { plainToInstance, instanceToPlain } from 'class-transformer';

export async function getLoans(): Promise<Loan[]> {
    const response = await mockServer('loans', 'GET');
    const rawLoans = await handleResponse(response);

    if (!Array.isArray(rawLoans)) {
        throw new Error('Expected an array of loans');
    }

    return plainToInstance(Loan, rawLoans);
}

export async function addLoan(newLoan: Loan): Promise<Loan> {
    const rawLoan = instanceToPlain(newLoan) as RawLoan;
    const response = await mockServer('loans', 'POST', rawLoan);
    const addedLoan = await handleResponse(response);
    return plainToInstance(Loan, addedLoan);
}

export async function updateLoan(id: string, changes: Partial<Loan>): Promise<Loan> {
    const loanChangesInstance = plainToInstance(Loan, changes, { exposeUnsetFields: false });
    const rawChanges = instanceToPlain(loanChangesInstance, {
        exposeUnsetFields: false,
    }) as Partial<RawLoan>;

    const response = await mockServer('loans', 'PUT', { where: { id }, changes: rawChanges });
    const updatedLoan = await handleResponse(response);
    return plainToInstance(Loan, updatedLoan);
}
