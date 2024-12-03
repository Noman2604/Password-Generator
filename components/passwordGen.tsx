"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Copy, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(6);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(false);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let charset = "";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSpecialChars) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    if (charset === "") {
      setPassword("Please select at least one character type");
      return;
    }

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(() => {
      setCopied(true);
      toast({
        title: "Password copied",
        description:
          "The generated password has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Card className="w-full max-w-md px-4 py-6 md:px-8 lg:max-w-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-lg md:text-xl">Password Generator</CardTitle>
        <CardDescription className="text-sm md:text-base">
          Generate a secure password based on your preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <Label htmlFor="generated-password">Generated Password</Label>
            <Input
              id="generated-password"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full font-mono"
              placeholder="Your password will appear here"

            />
          </div>
          <div>
            <Label htmlFor="length">Password Length</Label>
            <Input
              id="length"
              type="number"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              min="4"
              max="20"
              className="w-full"
            />
          </div>
          <div className="space-y-2 md:space-y-0 md:grid md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="uppercase">Include Uppercase</Label>
              <Switch
                id="uppercase"
                checked={includeUppercase}
                onCheckedChange={setIncludeUppercase}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="lowercase">Include Lowercase</Label>
              <Switch
                id="lowercase"
                checked={includeLowercase}
                onCheckedChange={setIncludeLowercase}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="numbers">Include Numbers</Label>
              <Switch
                id="numbers"
                checked={includeNumbers}
                onCheckedChange={setIncludeNumbers}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="special">Include Special Characters</Label>
              <Switch
                id="special"
                checked={includeSpecialChars}
                onCheckedChange={setIncludeSpecialChars}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <Button onClick={generatePassword} className="w-full md:flex-1">
              Generate Password
            </Button>
            <Button
              onClick={copyToClipboard}
              variant="outline"
              className="w-full md:w-auto"
              disabled={!password}
            >
              {copied ? (
                <Check className="h-4 w-4 mr-2" />
              ) : (
                <Copy className="h-4 w-4 mr-2" />
              )}
              Copy
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
