# Hotel-Booking-App
This is a marketplace app, it allows users to post their hotel rooms on the site, other users will be able to book those hotels, and as the platform owner will collect money from customers and pay back to sellers, while the platform will take a 20% of total sale as platform fee

There are two different kinds of users, one is sellers/hotel owners who will post their hotel rooms available for booking, the other one is buyer who wants to book a hotel room

<img width="500" alt="截屏2022-11-16 上午11 42 59" src="https://user-images.githubusercontent.com/111484402/202278797-f33b5ef0-3067-48de-91db-6b0196b3f1e8.png" >

After logged in, here is home page:

<img width="500" alt="截屏2022-11-16 上午11 45 14" src="https://user-images.githubusercontent.com/111484402/202279072-1da2f393-63d4-40f8-af2f-8a430382c7e3.png">

If user didn't complete stripe connect but want to post their hotel rooms on the site, we show them a button which will create their account with stripe without leaving our app. This way we can get them connect and create a connected account 

<img width="500" alt="截屏2022-11-16 上午11 48 58" src="https://user-images.githubusercontent.com/111484402/202279771-2c0f435c-85b0-4379-b4b3-ad7bc784f90f.png">

If user has successfully completed stripe connect, it will show all the hotels user has posted
Also, if user has successfully completed stripe connect, user can access stripe dashboard within this app. Users can update their address information and bank details. They can also see how much has been already transferred to their bank account. For the balance, if they have balance, it will be paid out automatically by stripe after the delay days

<img width="500" alt="截屏2022-11-16 上午11 57 54" src="https://user-images.githubusercontent.com/111484402/202281609-f33cef45-46a5-4729-9b2e-2aa08de45be1.png">

If user want to book a hotel, once the payment has been successul completed in Stripe, the user will be redirected to the dashboard so user can see their bookings in user purchase/booking history 

<img width="500" alt="截屏2022-11-16 下午12 05 43" src="https://user-images.githubusercontent.com/111484402/202283141-ff5df463-cdcb-4978-aec9-0cdd334261d7.png">



