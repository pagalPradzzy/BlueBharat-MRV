<<<<<<< HEAD
# BlueBharat - Blue Carbon MRV System 🌊

A comprehensive ecosystem for Monitoring, Reporting, and Verification (MRV) of Blue Carbon restoration projects in India, consisting of a mobile fieldworker app and a government dashboard.

## 🏗️ **System Architecture**

```
BlueBharat Ecosystem
├── 📱 Fieldworker Mobile App (React Native/Expo)
│   ├── Data Collection & Submission
│   ├── GPS Location Capture
│   ├── Photo Documentation
│   └── Offline Data Storage
│
├── 🖥️ MRV Dashboard (React Web App)
│   ├── Project Verification
│   ├── Data Analytics
│   ├── Blockchain Integration
│   └── Carbon Credit Minting
│
└── ⛓️ Blockchain Layer
    ├── Smart Contracts
    ├── Carbon Credit Registry
    └── Verification System
```

## 📱 **Fieldworker Mobile App**

### Features
- **Data Collection**: Submit plantation data with species, tree count, and area
- **GPS Integration**: Capture precise location coordinates
- **Photo Capture**: Take and attach photos to submissions
- **Offline Support**: Works without internet connection
- **Cross-Platform**: Runs on iOS, Android, and Web

### Tech Stack
- **Framework**: Expo SDK 53
- **Language**: TypeScript
- **UI**: React Native
- **Navigation**: Expo Router
- **Storage**: AsyncStorage
- **Maps**: React Native Maps
- **Camera**: Expo Image Picker
- **Location**: Expo Location

### Getting Started (Mobile App)
```bash
cd fieldworker-app
npm install
npm start
```

## 🖥️ **MRV Dashboard**

### Features
- **Role-Based Authentication**: Field Worker, NGO, NCCR Admin
- **Interactive Map**: Visual representation of restoration sites
- **Verification Panel**: Admin interface for project verification
- **Analytics**: Carbon sequestration trends and reporting
- **Blockchain Integration**: MetaMask wallet and carbon credit minting

### Tech Stack
- **Frontend**: React 18, JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **Maps**: React Leaflet, OpenStreetMap
- **Charts**: Recharts
- **Blockchain**: Ethers.js, MetaMask

### Getting Started (Dashboard)
```bash
cd src
npm install
npm start
```

## 🔄 **Data Flow**

1. **Field Workers** collect data using the mobile app
2. **Data** is stored locally and synced when online
3. **NGO Representatives** review submitted projects
4. **NCCR Admins** verify projects and approve for credits
5. **Blockchain** mints carbon credits for verified projects

## 🌍 **Use Cases**

### Environmental Conservation
- Mangrove restoration monitoring
- Seagrass bed protection
- Salt marsh conservation
- Blue carbon sequestration tracking

### Government Compliance
- NCCR (National Carbon Credit Registry) integration
- Environmental impact reporting
- Carbon credit verification
- Project transparency and accountability

## 🚀 **Quick Start**

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MetaMask browser extension (for dashboard)
=======
# Blue Carbon MRV Dashboard

A comprehensive government-style React dashboard for Monitoring, Reporting, and Verification (MRV) of Blue Carbon restoration projects in India.

## 🌊 Overview

This dashboard provides a complete solution for managing blue carbon restoration projects, from data submission by field workers to verification by NCCR administrators and carbon credit minting on the blockchain.

## ✨ Features

### 🔐 Role-Based Authentication
- **Field Worker**: Submit restoration data and track project progress
- **NGO Representative**: Review projects and manage verification requests  
- **NCCR Admin**: Verify projects and manage carbon credit minting

### 📊 Dashboard Components
- **Statistics Cards**: Real-time metrics for projects, hectares, and credits
- **Interactive Map**: Visual representation of restoration sites across India
- **Verification Panel**: Admin interface for project verification workflow
- **Data Visualization**: Charts and analytics using Recharts
- **Blockchain Integration**: Wallet connection and carbon credit minting

### 🗺️ Interactive Map Features
- Restoration sites marked with status indicators
- Click markers for project details
- Zoom controls and map navigation
- Real-time project status updates

### 📈 Analytics & Reporting
- Carbon sequestration trends over time
- Project distribution by region and status
- 5-year growth projections
- Export capabilities for reports

### ⛓️ Blockchain Integration
- MetaMask wallet connection
- Smart contract interaction
- Carbon credit minting
- Transaction history tracking

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MetaMask browser extension (for blockchain features)
>>>>>>> 885676a398e3b1311e2833436f284b35030b8d33

### Installation

1. **Clone the repository**
<<<<<<< HEAD
```bash
git clone https://github.com/prayasPradzzy/BlueBharat-MRV.git
cd BlueBharat-MRV
```

2. **Set up Mobile App**
```bash
cd fieldworker-app
npm install
npm start
```

3. **Set up Dashboard**
```bash
cd src
npm install
cp env.example .env
npm start
```

## 📊 **Project Structure**

```
BlueBharat-MRV/
├── fieldworker-app/          # Mobile app (React Native/Expo)
│   ├── app/                  # App screens and routing
│   ├── components/          # Reusable components
│   ├── assets/             # Images, fonts, etc.
│   └── package.json        # Mobile app dependencies
├── src/                     # Dashboard (React Web App)
│   ├── components/         # UI components
│   ├── pages/             # Application pages
│   ├── context/           # React context providers
│   └── data/              # Mock data and API functions
├── public/                 # Static assets
├── .github/               # GitHub workflows
└── README.md              # This file
```

## 🔐 **Authentication & Roles**

### Field Worker
- Submit restoration data
- Track project progress
- Upload photos and GPS coordinates

### NGO Representative
- Review submitted projects
- Manage verification requests
- Coordinate with field workers

### NCCR Admin
- Verify projects and data
- Approve carbon credit minting
- Manage blockchain transactions

## 🌍 **Environmental Impact**

This system supports India's blue carbon conservation efforts by:
- Enabling accurate data collection in remote coastal areas
- Providing real-time monitoring of restoration projects
- Facilitating transparent carbon credit verification
- Supporting government environmental policies

## 🔧 **Development**

### Mobile App Development
```bash
cd fieldworker-app
npm run android    # Android emulator
npm run ios        # iOS simulator
npm run web        # Web browser
```

### Dashboard Development
```bash
cd src
npm run build      # Production build
npm run analyze    # Bundle analysis
```

## 🚀 **Deployment**

### Mobile App
- **Expo**: Built-in deployment to app stores
- **EAS Build**: Custom development builds
- **Web**: Deploy to any static hosting

### Dashboard
- **Vercel**: `vercel --prod`
- **Netlify**: `netlify deploy --prod`
- **GitHub Pages**: `npx gh-pages -d build`

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 **Support**

For support and questions:
- Check the documentation in each component
- Review the demo scenarios
- Contact the development team

## 🔮 **Future Enhancements**

- Real-time data synchronization
- Advanced analytics and AI insights
- Multi-language support
- Advanced blockchain features
- IoT sensor integration
- Satellite imagery integration

---

**Built for the Government of India's Blue Carbon MRV Initiative**

*Supporting environmental conservation through technology*
=======
   ```bash
   git clone <repository-url>
   cd bluecarbon-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   Edit `.env` with your configuration:
   ```env
   REACT_APP_POLYGON_MUMBAI_RPC_URL=https://rpc-mumbai.maticvigil.com
   REACT_APP_CONTRACT_ADDRESS=0x1234567890123456789012345678901234567890
   REACT_APP_CHAIN_ID=80001
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.js       # Dashboard header with user info
│   ├── Sidebar.js      # Navigation sidebar
│   ├── Footer.js       # Government footer
│   ├── StatsCard.js    # Statistics display cards
│   ├── MapContainer.js # Interactive map component
│   ├── VerificationTable.js # Project verification table
│   ├── WalletConnect.js # Blockchain wallet connection
│   └── ...
├── pages/              # Main application pages
│   ├── Login.js        # Role-based login
│   ├── Dashboard.js    # Main dashboard
│   ├── VerificationPanel.js # Admin verification interface
│   ├── Analytics.js    # Data visualization page
│   └── Blockchain.js   # Blockchain integration page
├── context/            # React context providers
│   ├── AuthContext.js  # Authentication state
│   └── BlockchainContext.js # Blockchain state
├── data/               # Mock data and API functions
│   └── mockData.js     # Sample project data
└── utils/              # Helper functions
```

## 🎯 Demo Scenarios

### 1. Field Worker Workflow
1. Login as "Field Worker"
2. Navigate to "Submit Data"
3. Fill out project information form
4. Upload GPS coordinates and images
5. Submit for verification

### 2. NGO Review Process
1. Login as "NGO"
2. Go to "Projects Overview"
3. Review submitted projects
4. Check project details and images
5. Approve or request modifications

### 3. NCCR Admin Verification
1. Login as "NCCR Admin"
2. Access "Verification Panel"
3. Review pending projects
4. Verify GPS coordinates and data
5. Approve projects for credit minting

### 4. Blockchain Integration
1. Connect MetaMask wallet
2. Navigate to "Blockchain" page
3. Select verified project
4. Mint carbon credits
5. View transaction on blockchain

## 🎨 Design System

### Government UI Standards
- **Colors**: Primary `#1e40af`, Secondary `#6b7280`
- **Font**: `system-ui, sans-serif`
- **Components**: Clean, professional design
- **No animations** except hover states
- **Accessibility**: WCAG compliant

### Component Guidelines
- Each component under 100 lines
- Descriptive variable names
- PropTypes for props validation
- Loading and error states
- Mobile-responsive design

## 🔧 Technology Stack

- **Frontend**: React 18, JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Maps**: React Leaflet, OpenStreetMap
- **Charts**: Recharts
- **Blockchain**: Ethers.js, MetaMask
- **State Management**: React Context API

## 📱 Mobile Responsiveness

The dashboard is fully responsive with:
- Mobile-first design approach
- Collapsible sidebar on mobile
- Touch-friendly interface
- Optimized charts for small screens
- Government-style mobile navigation

## 🔒 Security Features

- Role-based access control
- Protected routes
- Input validation
- Secure localStorage usage
- No sensitive data storage

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm run build:analyze  # For bundle analysis
```

### Environment Variables for Production
Create a `.env.production` file with:
```env
REACT_APP_POLYGON_MUMBAI_RPC_URL=https://rpc-mumbai.maticvigil.com
REACT_APP_CONTRACT_ADDRESS=your_contract_address
REACT_APP_CHAIN_ID=80001
REACT_APP_API_BASE_URL=https://your-api.com/api
REACT_APP_MAPBOX_TOKEN=your_mapbox_token
REACT_APP_APP_NAME=Blue Carbon MRV Dashboard
REACT_APP_VERSION=1.0.0
```

### Deployment Platforms

#### Vercel
```bash
npm install -g vercel
vercel
```

#### Netlify
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=build
```

#### GitHub Pages
Add to package.json:
```json
"homepage": "https://yourusername.github.io/bluecarbon-dashboard"
```
Then:
```bash
npm install --save-dev gh-pages
npm run build
npx gh-pages -d build
```

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📊 Mock Data

The application includes comprehensive mock data:
- 8+ restoration projects across India
- User data for all role types
- Blockchain transaction history
- Carbon sequestration time-series data
- Project images and GPS coordinates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the coding standards
4. Add tests for new features
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Check the documentation
- Review the demo scenarios
- Contact the development team

## 🔮 Future Enhancements

- Real API integration
- Advanced analytics
- Mobile app version
- Multi-language support
- Advanced blockchain features
- Real-time notifications

---

**Built for the Government of India's Blue Carbon MRV Initiative**
>>>>>>> 885676a398e3b1311e2833436f284b35030b8d33
