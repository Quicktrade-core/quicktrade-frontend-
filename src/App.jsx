// src/App.jsx
import { createBrowserRouter, RouterProvider } from "react-router"
import ContextProvider from "./context/contextProvider"
import RootLayout from "./rootLayout"
import HomePage from "./pages/homePage"
import CartPage from "./pages/cartPage"
import NotfoundPage from "./pages/notfoundPage"
import AuthPage from "./pages/authPage"
import RegisterPage from "./pages/registerPage"
import VideosPage from "./pages/videosPage"
import ProductPage from "./pages/productPage"
import CheckoutPage from "./pages/checkoutPage"
import AccountPage from "./pages/accountPage/accountPage"
import ProfilePage from "./pages/accountPage/profilePage"
import WalletPage from "./pages/accountPage/walletPage"
import NotificationsPage from "./pages/accountPage/notificationsPage"
import SecurityPage from "./pages/accountPage/securityPage"
import SettingsPage from "./pages/accountPage/settingsPage"
import EbooksPage from "./pages/accountPage/ebooksPage"
import TicketsPage from "./pages/accountPage/ticketsPage"
import TicketDetailPage from "./pages/ticketDetailPage"
import OrdersPage from "./pages/accountPage/ordersPage"
import OrderPage from "./pages/accountPage/orderPage"
import SavedPage from "./pages/accountPage/savedPage"
import SellerPage from "./pages/sellerPage"
import Products from "./components/seller/products"
import Reels from "./components/seller/reels"
import Stores from "./components/seller/stores"
import ForgotPasswordPage from "./pages/forgotPasswordPage/forgotPasswordPage"
import VerificationPage from "./pages/forgotPasswordPage/verificationPage"
import NewPasswordPage from "./pages/forgotPasswordPage/newPasswordPage"
import SearchPage from "./pages/searchPage"

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <RootLayout />, children: [{ index: true, element: <HomePage /> }] },
    {
      path: "/seller",
      element: <SellerPage />,
      children: [
        { index: true, element: <Products /> },
        { path: "reels", element: <Reels /> },
        { path: "stores", element: <Stores /> },
      ],
    },
    { path: "/search", element: <SearchPage /> },
    { path: "/product/:id", element: <ProductPage /> },
    { path: "/cart", element: <CartPage /> },
    { path: "/checkout", element: <CheckoutPage /> },
    { path: "/videos", element: <VideosPage /> },
    { path: "/account", element: <AccountPage /> },
    { path: "/profile", element: <ProfilePage /> },
    { path: "/wallet", element: <WalletPage /> },
    { path: "/notifications", element: <NotificationsPage /> },
    { path: "/security", element: <SecurityPage /> },
    { path: "/settings", element: <SettingsPage /> },
    { path: "/ebooks", element: <EbooksPage /> },
    { path: "/tickets", element: <TicketsPage /> },
    { path: "/tickets/:id", element: <TicketDetailPage /> },
    { path: "/orders", element: <OrdersPage /> },
    { path: "/order/:id", element: <OrderPage /> },
    { path: "/saved", element: <SavedPage /> },
    { path: "/auth", element: <AuthPage /> },
    { path: "/register", element: <RegisterPage /> },
    { path: "/forgotpassword", element: <ForgotPasswordPage /> },
    { path: "/verification", element: <VerificationPage /> },
    { path: "/newpassword", element: <NewPasswordPage /> },
    { path: "*", element: <NotfoundPage /> },
  ])

  return (
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  )
}

export default App