import API from "@/components/docs/API";
import Showcase from "@/components/docs/Showcase";
import SDK from "@/components/docs/SDK";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function docsPage() {
  return (
    <div className="py-10">
      <Card className="h-full container mx-auto">
        <CardHeader>
          <CardTitle>Documentation</CardTitle>
          <CardDescription>
            Get started with EverLetter. Here you can find all the documentation
            you need to get started.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="sdk">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="sdk">SDK</TabsTrigger>
              <TabsTrigger value="api">API</TabsTrigger>
              <TabsTrigger value="showcase">Showcase</TabsTrigger>
            </TabsList>
            <TabsContent value="sdk">
              <SDK />
            </TabsContent>
            <TabsContent value="api">
              <API />
            </TabsContent>
            <TabsContent value="showcase">
              <Showcase />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
