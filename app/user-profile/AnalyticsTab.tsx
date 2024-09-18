'use client';
import { PostProps } from "@/components/custom/Posts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

const AnalyticsTab = ({adminuser}:PostProps) => {
	console.log(adminuser); 
	
	let price = 0;
	adminuser?.isSubscription.forEach((subscription:any) => {
		price += subscription.price;
	});
	return (
		<>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5'>
				<Card className="frame bg-transparent text-white inshadow border-[2px]  border-[#ffffff23]">
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>Total Revenue</CardTitle>
						<DollarSign className='h-4 w-4 text-muted-foreground' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>$ { price} </div>
					</CardContent>
				</Card>

				 
       <Card className="frame bg-transparent text-white inshadow border-[2px]  border-[#ffffff23]">
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>Subscriptions</CardTitle>
						<DollarSign className='h-4 w-4 text-muted-foreground' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>+{adminuser?.isSubscription.length}</div>
					</CardContent>
				</Card>
			</div>

			<div className='flex flex-wrap gap-5 my-5'>
				
				<Card className="flex-1 frame bg-transparent text-white inshadow border-[2px]  border-[#ffffff23]">
				<CardHeader className='px-3'>
					<CardTitle>Recent Subscriptions</CardTitle>
				</CardHeader>
				<CardContent className='grid gap-8 px-3'>
					{adminuser && adminuser?.isSubscription.length === 0 && (
						<p className='text-sm text-muted-foreground'>No recent subscriptions</p>
					)}

					{adminuser?.isSubscription.map((subscription:any) => (
						<div className='flex items-center gap-2' key={subscription.user.email}>
							{/* <Avatar className='hidden h-9 w-9 sm:flex'>
								<AvatarImage src={subscription.user.image || "/user-placeholder.png"} alt='Avatar' />
								<AvatarFallback>CN</AvatarFallback>
							</Avatar> */}
							<div className='grid gap-1'>
								<p className='text-xs font-medium leading-none'>{subscription.user.name}</p>
								<p className='text-xs text-muted-foreground'>{subscription.user.email}</p>
							</div>
							{/* <div className='ml-auto font-medium'>+${centsToDollars(subscription.price)}</div> */}
						</div>
					))}
				</CardContent>
			</Card>
			</div>
		</>
	);
};
export default AnalyticsTab;

 