<template>
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section logo">
            <h2>NeuronThreads</h2>
            <p>
              Specializes in providing high-quality, stylish products for your wardrobe
            </p>
          </div>
          <div class="footer-section">
            <h4>SHOP</h4>
            <ul>
              <li><a href="#">All Collections</a></li>
              <li><a href="#">Winter Edition</a></li>
              <li><a href="#">Discount</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>COMPANY</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Affiliates</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>SUPPORT</h4>
            <ul>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Cookie Policy</a></li>
              <li><a href="#">Terms of Use</a></li>
            </ul>
          </div>
          <div class="footer-section payment-methods">
            <h4>PAYMENT METHODS</h4>
            <div class="payment-icons">
              <img src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63eb1ce8f032504012a5896b_Mastercard.png" alt="Mastercard" />
              <img src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63eb1ce82d440b7ab84a993f_visa.png" alt="Visa" />
              <img src="https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63eb1ce7c4510cf9a55828a0_PayPal.png" alt="PayPal" />
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>Copyright &copy; 2022 NeuronThreads. All rights reserved</p>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: "Footer",
  };
  </script>
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');

  .footer {
    background-color: #f3f4f6;
    color: #666;
    padding: 40px 0;
    width: 100%;
    font-family: 'Outfit', sans-serif;
  }
  
  .container {
    /* max-width: 1200px; */
    margin: 0 auto;
    width: 100%;
    padding: 0 20px;
  }
  
  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    margin-bottom: 20px;
  }
  
  .footer-section {
    flex: 1;
    margin: 20px;
  }
  
  .footer-section h4 {
    font-size: 1.2em;
    margin-bottom: 10px;
    color: #333;
  }
  
  .footer-section ul {
    list-style-type: none;
    padding: 0;
  }
  
  .footer-section ul li {
    margin-bottom: 8px;
  }
  
  .footer-section ul li a {
    color: #666;
    text-decoration: none;
  }
  
  .footer-section ul li a:hover {
    color: #000;
  }
  
  .logo h2 {
    font-size: 1.8em;
    color: #000;
    margin-bottom: 10px;
  }
  
  .logo p {
    max-width: 250px;
    color: #666;
  }
  .payment-icons{
    display: flex;
    width: 150px;
    justify-content: space-between;
  }
  .payment-methods .payment-icons img {
    height: 30px;
    /* margin-right: 10px; */
  }
  
  .footer-bottom {
    text-align: center;
    padding-top: 20px;
    border-top: 1px solid #e0e0e0;
    color: #666;
  }
  
  .footer-bottom p {
    margin: 0;
    font-size: 0.9em;
  }
  </style>
  
  