# Angular Material App

A beautiful, responsive web application built with Angular and Material Design components. This app showcases the power of Angular Material with a modern dark theme and comprehensive component demonstrations.

## 🚀 Features

- **Material Design Components**: Cards, Buttons, Toolbar, Tabs, Progress bars, Chips, and Icons
- **Dark Theme**: Beautiful dark theme with custom color palettes
- **Responsive Design**: Optimized for all screen sizes and devices
- **Modern Angular**: Built with Angular 20+ and standalone components
- **TypeScript**: Type-safe development with excellent IDE support
- **SCSS Styling**: Advanced styling with Sass/SCSS
- **Animations**: Smooth transitions and engaging user interactions

## 🛠️ Technologies Used

- Angular 20+
- Angular Material
- TypeScript
- SCSS/Sass
- RxJS
- Angular CLI

## 📦 Installation

1. **Clone the repository** (if applicable):
   ```bash
   git clone <repository-url>
   cd angular-material-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   ng serve
   ```

4. **Open your browser** and navigate to `http://localhost:4200`

## 🎨 Project Structure

```
src/
├── app/
│   ├── app.ts                 # Main app component
│   ├── app.html              # App template with Material components
│   ├── app.scss              # Custom styling and animations
│   ├── app.config.ts         # App configuration with providers
│   └── app.routes.ts         # Routing configuration
├── styles.scss               # Global styles and Material theming
├── index.html               # Main HTML file
└── main.ts                  # Application bootstrap
```

## 🎯 Available Scripts

- `ng serve` - Start development server
- `ng build` - Build the project for production
- `ng test` - Run unit tests
- `ng lint` - Run linting
- `ng e2e` - Run end-to-end tests

## 🎨 Customization

### Theme Customization
The app uses a custom dark theme defined in `src/styles.scss`. You can customize the color palettes by modifying:

```scss
$angular-material-app-primary: mat.define-palette(mat.$indigo-palette);
$angular-material-app-accent: mat.define-palette(mat.$pink-palette, A200, A100, A400);
$angular-material-app-warn: mat.define-palette(mat.$red-palette);
```

### Component Styling
Custom styles for components are in `src/app/app.scss`. The styles include:
- Responsive breakpoints
- Hover effects and animations
- Card layouts and grids
- Material component customizations

## 📱 Responsive Design

The app is fully responsive with breakpoints for:
- Desktop (>768px)
- Tablet (768px and below)
- Mobile (480px and below)

## 🔧 Development

### Adding New Components
1. Generate a new component: `ng generate component component-name`
2. Import required Material modules in the component
3. Add the component to your routes if needed

### Material Components Used
- `MatToolbarModule` - Navigation toolbar
- `MatCardModule` - Content cards
- `MatButtonModule` - Action buttons
- `MatIconModule` - Material icons
- `MatChipsModule` - Technology tags
- `MatTabsModule` - Tabbed content
- `MatProgressBarModule` - Progress indicators

## 🚀 Deployment

### Build for Production
```bash
ng build --prod
```

The build artifacts will be stored in the `dist/` directory.

### Deployment Options
- **Netlify**: Drag and drop the `dist` folder
- **Vercel**: Connect your repository for automatic deployments
- **Firebase Hosting**: Use `ng deploy` with Angular Fire
- **GitHub Pages**: Use `ng deploy` with angular-cli-ghpages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Angular Team](https://angular.io/) for the amazing framework
- [Material Design](https://material.io/) for the design system
- [Angular Material](https://material.angular.io/) for the component library

---

Built with ❤️ using Angular and Material Design
