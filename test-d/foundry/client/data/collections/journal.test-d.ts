import { expectType } from 'tsd';

const journal = new Journal();
expectType<StoredDocument<JournalEntry>>(journal.get('', { strict: true }));
expectType<StoredDocument<JournalEntry>['_source'][]>(journal.toJSON());
expectType<JournalDirectory | undefined>(journal.directory);