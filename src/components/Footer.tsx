import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { MailIcon, Github, Linkedin } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function Footer() {
  const { t } = useLanguage();
  // get the current local time
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      date.setHours(date.getHours());
      setTime(
        date.toLocaleTimeString("en-US", {
          hour12: true,
          hour: "numeric",
          minute: "numeric",
        }),
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full bg-gradient-to-t from-primary/[1%] to-transparent">
      <div className="container mx-auto flex flex-row items-center justify-between py-6">
        <span className="flex flex-row items-center space-x-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Carlos Gael Taponjou Kenfack
          </p>
          <hr className="hidden h-6 border-l border-muted md:flex" />
          <span className="flex hidden flex-row items-center space-x-2 md:flex">
            <p className="text-xs text-muted-foreground">{t.footer.localTime}</p>
            <p className="text-sm font-semibold">{time}</p>
          </span>
        </span>
        <div className="flex flex-row items-center gap-2">
          <Link
            href="https://github.com/taponjou"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            <Button 
              variant={"outline"} 
              size="icon"
              className="hover:bg-[#1F2937]/10 hover:border-[#1F2937]"
            >
              <Github className="h-4 w-4 text-[#1F2937] dark:text-white" />
            </Button>
          </Link>
          <Link
            href="https://www.linkedin.com/in/carlos-taponjou-bb58929b/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            <Button 
              variant={"outline"} 
              size="icon"
              className="hover:bg-[#0A66C2]/10 hover:border-[#0A66C2]"
            >
              <Linkedin className="h-4 w-4 text-[#0A66C2]" />
            </Button>
          </Link>
          <Link
            href="mailto:taponjoucarlos@gmail.com"
            passHref
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            <Button variant={"outline"}>
              <MailIcon className="h-4 w-4 md:mr-2" />
              <span className="hidden md:flex">taponjoucarlos@gmail.com</span>
            </Button>
          </Link>
        </div>
      </div>
      <div className="h-1 bg-[radial-gradient(closest-side,#000000,#666666,#000000,transparent)] opacity-50" />
    </footer>
  );
}
