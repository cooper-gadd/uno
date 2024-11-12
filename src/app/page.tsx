import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="container flex flex-1 flex-col gap-8 p-4 md:p-8">
      <div className="space-y-4 py-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-7xl">
          UNO
        </h1>
        <p className="text-xl text-muted-foreground">
          The card game, but online.
        </p>
        <Button size="lg" className="mt-4">
          Play Now!
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Instant Online Matches</CardTitle>
            <CardDescription>No waiting, just playing</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5">
              <li>Challenge players worldwide instantly</li>
              <li>Real-time gameplay with no delays</li>
              <li>Auto-save and resume games anytime</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Social Gaming Hub</CardTitle>
            <CardDescription>Connect & compete</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5">
              <li>Live chat with opponents</li>
              <li>Active player lobby</li>
              <li>Challenge friends directly</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Modern Gaming Experience</CardTitle>
            <CardDescription>Sleek, smooth, responsive</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5">
              <li>Beautiful SVG graphics</li>
              <li>Smooth animations</li>
              <li>Works on all devices</li>
            </ul>
          </CardContent>
        </Card>

        {/* Fair Play */}
        <Card>
          <CardHeader>
            <CardTitle>Fair Play System</CardTitle>
            <CardDescription>Play with confidence</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5">
              <li>Anti-cheat protection</li>
              <li>Turn-based control</li>
              <li>Instant win detection</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Bank-Grade Security</CardTitle>
            <CardDescription>Safe & secure gaming</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5">
              <li>Secure login system</li>
              <li>Data encryption</li>
              <li>Regular security updates</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Play Anywhere</CardTitle>
            <CardDescription>Gaming freedom</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5">
              <li>No downloads needed</li>
              <li>Works on all browsers</li>
              <li>Mobile-friendly design</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
