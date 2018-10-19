jest.setTimeout(60000);

const { setupDatum } = require('../utils');

let datum;
let anotherAccount;

beforeAll(async (done) => {
  datum = await setupDatum();
  anotherAccount = await setupDatum();
  done();
});

describe('set data with public keys', () => {
  const DATA = 'data';

  it('sets data with a string address as owner', async () => {
    const anotherAccountPublicKey = await anotherAccount.getIdentityPublicKey();
    const anotherAccountEncryptionKey = await anotherAccount.getEncryptionPublicKey();
    const publicKeysToAdd = [{
      publicKey: anotherAccountPublicKey,
      encryptionKey: anotherAccountEncryptionKey,
    }];

    const hash = await datum.set(
      DATA,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      publicKeysToAdd,
    );

    expect(await anotherAccount.get(hash)).toBe(DATA);
  });
});
