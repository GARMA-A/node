import { Card, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
export default function LoginPage() {
	return <Tabs defaultValue="signin" className="max-auto w-full my-6 px-4">
		<TabsList>
			<TabsTrigger value="signin">
				Sign In

			</TabsTrigger>

			<TabsTrigger value="signout">
				Sign Out

			</TabsTrigger>
			<Card>
				<TabsContent value="signin">
					<CardHeader className="text-2xl font-bold" >
						SignIn

					</CardHeader>


				</TabsContent>


			</Card>

			<Card>
				<TabsContent value="signout">
					<CardHeader className="text-2xl font-bold" >
						Signout

					</CardHeader>


				</TabsContent>


			</Card>

		</TabsList>


	</Tabs>
}
