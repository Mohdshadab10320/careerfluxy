import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-card">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <div className="gradient-bg rounded-lg p-1.5">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold">
              Career<span className="gradient-text">Fluxy</span>
            </span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Practice Smart. Get Hired Faster.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold text-foreground mb-3 text-sm">Product</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/simulator" className="hover:text-foreground transition-colors">AI Simulator</Link></li>
            <li><Link to="/companies" className="hover:text-foreground transition-colors">Companies</Link></li>
            <li><Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold text-foreground mb-3 text-sm">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold text-foreground mb-3 text-sm">Legal</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-border text-center text-sm text-muted-foreground space-y-1">
        <p>© 2026 CareerFluxy. All rights reserved.</p>
        <p className="text-xs font-medium tracking-wide text-muted-foreground/70">
          DEVELOPED BY MOHD SHADAB.DATA.DEV
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
