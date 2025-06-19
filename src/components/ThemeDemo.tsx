import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ThemeDemo = () => {
  const { theme, setTheme, themes } = useTheme();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Theme Demo</CardTitle>
          <CardDescription className="text-center">
            Test the dark and light mode functionality
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Current theme:{" "}
            <span className="font-semibold text-foreground">{theme}</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Button
              variant={theme === "light" ? "default" : "outline"}
              size="sm"
              onClick={() => setTheme("light")}
              className="flex items-center gap-2"
            >
              <Sun className="h-4 w-4" />
              Light
            </Button>

            <Button
              variant={theme === "dark" ? "default" : "outline"}
              size="sm"
              onClick={() => setTheme("dark")}
              className="flex items-center gap-2"
            >
              <Moon className="h-4 w-4" />
              Dark
            </Button>

            <Button
              variant={theme === "system" ? "default" : "outline"}
              size="sm"
              onClick={() => setTheme("system")}
              className="flex items-center gap-2"
            >
              <Monitor className="h-4 w-4" />
              System
            </Button>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">Theme Variables Test:</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 bg-primary text-primary-foreground rounded">
                Primary
              </div>
              <div className="p-2 bg-secondary text-secondary-foreground rounded">
                Secondary
              </div>
              <div className="p-2 bg-muted text-muted-foreground rounded">
                Muted
              </div>
              <div className="p-2 bg-accent text-accent-foreground rounded">
                Accent
              </div>
            </div>
          </div>

          <div className="p-4 border border-border rounded-lg bg-card text-card-foreground">
            <div className="text-sm font-medium mb-2">Card Example</div>
            <div className="text-xs text-muted-foreground">
              This card adapts to the current theme using CSS variables.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThemeDemo;
