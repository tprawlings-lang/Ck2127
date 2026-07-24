import { site, type CredentialStatus } from '@/config/site';

/**
 * Credential display honors the launch gate: 'active' shows as verified,
 * 'pending' shows an honest in-progress state, 'hidden'/'expired' render nothing.
 * Never claims an unverified credential.
 */
export function CredentialCard({
  name,
  issuer,
  status,
  verifyUrl,
}: {
  name: string;
  issuer: string;
  status: CredentialStatus;
  verifyUrl?: string;
}) {
  if (status === 'hidden' || status === 'expired') return null;
  return (
    <div className="card !p-4">
      <p className="font-heading font-bold text-slate-deep">
        {status === 'pending' ? `${name} (in progress)` : name}
      </p>
      <p className="text-sm text-muted">{issuer}</p>
      {status === 'active' && verifyUrl ? (
        <a href={verifyUrl} className="text-sm font-semibold text-terracotta" rel="noopener noreferrer" target="_blank">
          Verify credential
        </a>
      ) : status === 'active' ? (
        <p className="text-sm font-semibold text-success">Verified and active</p>
      ) : (
        <p className="text-sm text-muted">Will be displayed as certified only once active and verified.</p>
      )}
    </div>
  );
}

export function CredentialList() {
  const { nasmCpt, cprAed, nasmCnc, degree } = site.credentials;
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <CredentialCard {...nasmCpt} />
      <CredentialCard {...cprAed} />
      <CredentialCard {...nasmCnc} />
      <CredentialCard {...degree} />
    </div>
  );
}
