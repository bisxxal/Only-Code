'use client';
import { PostProps } from "@/components/custom/Posts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; 
import Image from "next/image";

const AnalyticsTab = ({adminuser ,youSubscribed}:PostProps) => {

	let price = 0;
	adminuser?.isSubscription.forEach((subscription:any) => {
		price += subscription.price;
	});
	return (
		<>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5 bg-red-60 '>
				<Card className="frame bg-transparent text-white inshadow border-[2px]  border-[#ffffff23] ">
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>Total Revenue</CardTitle>
						<p className='h-4 w-4 text-muted-foreground font-semibold' > ₹ </p> 
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>$ { price} </div>
					</CardContent>
				</Card>

				 
       <Card className="frame bg-transparent text-white inshadow border-[2px]  border-[#ffffff23]">
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>Subscriptions</CardTitle>
						<p className='h-4 w-4 text-muted-foreground font-semibold' > ₹ </p> 
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>+{adminuser?.isSubscription.length}</div>
					</CardContent>
				</Card>
			</div>

			<div className='flex flex-wrap gap-5 my-5'>
				
				<Card className="flex-1 frame bg-transparent text-white inshadow border-[2px] w-[80%]  border-[#ffffff23]">
				<CardHeader className='px-3'>
					<CardTitle>Recent Subscriptions</CardTitle>
				</CardHeader>
				<CardContent className='grid gap-8 px-3'>
					{adminuser && adminuser?.isSubscription.length === 0 && (
						<p className='text-sm text-muted-foreground'>No recent subscriptions</p>
					)}

					{youSubscribed && youSubscribed?.map((subscription:any) => (
						<div className='flex items-center gap-3' key={subscription.id}>
						 <Image src={subscription?.image} alt='' width={200} height={200} className='h-14  border w-14 object-cover rounded-full'/>

							<div className='grid gap-1'>
								<p className='text-xs font-medium leading-none'>{subscription?.name}</p>
								<p className='text-  text-blue-500'>₹ {subscription?.subscriptionPrice}</p>
							</div>
						 
						</div>
					))}
				</CardContent>
			</Card>
			</div>
		</>
	);
};
export default AnalyticsTab;

 