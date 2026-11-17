
import { CharlaDestacada } from "./CharlaDestacada";
import Navbar from "./navbar/Navbar";
import { Footer } from "./footer/Footer";

export function AuthLayout({ children, onIrAInicio }) {
  return (
    <div className="auth">
      <Navbar
        modoAuth={true}
        onIrAInicio={onIrAInicio}
      />

      <main className="auth-main">
        <CharlaDestacada />

        <section className="auth-panel">
          {children}
        </section>
      </main>

      <Footer />
    </div>
  );
}
