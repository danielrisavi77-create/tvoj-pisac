import { formatPublicPackagePrice } from "@/components/public/PackageCard";
import { PublicPageShell } from "@/components/public/PublicPageShell";
import { PUBLIC_PACKAGES } from "@/content/public";

export default function PricingPage() {
  return (
    <PublicPageShell
      title="Cijene"
      intro="Standardne cijene služe kao pregled početne ponude za jasno definirane pakete."
    >
      <table>
        <caption>Standardne cijene paketa</caption>
        <thead>
          <tr>
            <th scope="col">Paket</th>
            <th scope="col">Cijena</th>
            <th scope="col">Napomena</th>
          </tr>
        </thead>
        <tbody>
          {PUBLIC_PACKAGES.map((packageContent) => (
            <tr key={packageContent.slug}>
              <th scope="row">{packageContent.title}</th>
              <td>{formatPublicPackagePrice(packageContent.priceEur)}</td>
              <td>
                <p>{packageContent.scopeNote}</p>
                <p>{packageContent.priceNote}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </PublicPageShell>
  );
}
