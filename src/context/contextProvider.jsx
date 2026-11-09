// src/context/contextProvider.jsx
import AuthProvider from "./authContext"
import CartProvider from "./cartContext"
import EbookProvider from "./ebookContext"
import NotificationProvider from "./notificationContext"
import OrderProvider from "./orderContext"
import ProductProvider from "./productContext"
import SavedProvider from "./savedContext"
import ThemeProvider from "./themeContext"
import TicketProvider from "./ticketContext"
import UserProvider from "./userContext"
import VideoProvider from "./videoContext"

const ContextProvider = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <UserProvider>
          <ProductProvider>
            <CartProvider>
              <NotificationProvider>
                <OrderProvider>
                  <TicketProvider>
                    <EbookProvider>
                      <SavedProvider>
                        <VideoProvider>{children}</VideoProvider>
                      </SavedProvider>
                    </EbookProvider>
                  </TicketProvider>
                </OrderProvider>
              </NotificationProvider>
            </CartProvider>
          </ProductProvider>
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default ContextProvider