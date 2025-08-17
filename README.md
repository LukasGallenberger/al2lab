# Factory Planning Calculator (AL2)

A comprehensive factory planning and optimization tool built with SvelteKit, designed to help plan production chains, calculate machine requirements, and optimize resource allocation for factory automation games.

## 🚀 Features

### Core Functionality
- **Production Planning**: Select any item and set production rates
- **Machine Configuration**: Adjust machine speeds and see real-time impact
- **Resource Calculation**: Automatically calculates all required materials and machines
- **Dynamic Overview**: Real-time updates based on your selections

### New Overview System
- **Machine Requirements Overview**: 
  - Grouped by machine types (Basic Crafters, Specialized, Advanced, Radioactive)
  - Shows current speed configuration for each machine
  - Displays number of machines needed
  - Collapsible details showing production output per machine

- **Materials Overview**:
  - Dynamic calculation of total materials needed
  - Visual material cards with icons and quantities
  - Real-time updates across production chains

- **Production Summary**:
  - Total items in production chain
  - Total machines required
  - Unique materials needed

## 🏗️ Architecture

### Technology Stack
- **Frontend**: SvelteKit with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom component library built with Radix UI primitives
- **Icons**: Lucide Svelte icons

### Project Structure
```
src/
├── lib/
│   ├── components/ui/     # Reusable UI components
│   ├── machines.json      # Machine definitions and speed options
│   ├── resources.json     # Resource recipes and dependencies
│   └── utils.ts          # Utility functions
├── routes/
│   └── al2/              # Main application routes
│       ├── +page.svelte  # Main page layout
│       ├── factory.svelte # Factory management interface
│       ├── overview.svelte # NEW: Dynamic overview system
│       ├── data.svelte   # Enhanced data visualization
│       ├── list.svelte   # Production chain list
│       ├── objective.svelte # Item selection and production rate
│       ├── settings.svelte # Machine speed configuration
│       ├── stores.ts     # Svelte stores for state management
│       └── header.svelte # Application header
└── static/               # Static assets and images
```

## 🎯 Usage

### Getting Started
1. **Select Production Target**: Use the Objective section to choose what you want to produce
2. **Set Production Rate**: Specify how many items per second you need
3. **Configure Machines**: Adjust machine speeds in the Settings panel
4. **View Results**: Check the Overview tab for comprehensive requirements

### Interface Tabs

#### **List Tab**
- Hierarchical view of production chain
- Shows dependencies and relationships
- Collapsible sections for detailed view

#### **Data Tab**
- Organized machine requirements by type
- Shows production rates and machine counts
- Enhanced with grouping and visual improvements

#### **Overview Tab** ⭐ **NEW**
- **Machine Requirements**: Organized by machine categories with speed configurations
- **Materials Overview**: Total materials needed across all production chains
- **Production Summary**: Key metrics and statistics

#### **Flow Tab**
- 🚧 Under construction - Future feature for visual flow diagrams

### Machine Types

#### Basic Crafters
- **Starter**: Basic crafting with variable speeds (0.25x - 5x)
- **Crafter MK1-3**: Progressive crafting machines (1x - 5x)

#### Specialized Machines
- **Wire Drawer**: Produces wire components
- **Cutter**: Cuts materials to specifications
- **Furnace**: Smelting and heat processing
- **Cable Maker**: Creates cable components
- **Hydraulic Press**: High-pressure forming

#### Advanced Machines
- **Refinery**: Advanced material processing
- **Importer**: High-capacity import operations (1x - 15x)

#### Radioactive Machines
- **Radioactive Starter**: Handles radioactive materials
- **Radioactive Crafter MK1-2**: Specialized radioactive crafting

## 🛠️ Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd factory-planning-calculator

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run check        # Type check with Svelte
npm run lint         # Lint code with ESLint
```

### Adding New Features
1. **New Machines**: Add to `src/lib/machines.json`
2. **New Resources**: Add to `src/lib/resources.json`
3. **New Components**: Create in `src/lib/components/`
4. **New Routes**: Add to `src/routes/`

## 📊 Data Structure

### Machine Configuration
```json
{
  "machine_name": {
    "speed": [1, 2, 3, 4, 5]
  }
}
```

### Resource Recipes
```json
{
  "item_name": {
    "items": {
      "material1": 2,
      "material2": 1
    },
    "craft": "machine_type"
  }
}
```

## 🎨 UI Components

The application uses a custom component library built on top of Radix UI primitives:

- **Cards**: Information containers with headers and content
- **Tabs**: Organized content sections
- **Collapsible**: Expandable content areas
- **Accordion**: Grouped collapsible sections
- **Sliders**: Machine speed configuration
- **Buttons**: Interactive elements with variants
- **Tooltips**: Contextual information on hover

## 🔄 State Management

Uses Svelte stores for reactive state management:

- **`objective`**: Currently selected item and production rate
- **`settings`**: Machine speed configurations
- **`list`**: Calculated production chain
- **`data`**: Compiled machine and material requirements

## 🚧 Future Features

- **Flow Diagrams**: Visual representation of production chains
- **Export/Import**: Save and load factory configurations
- **Advanced Analytics**: Production efficiency metrics
- **Multi-language Support**: Internationalization
- **Mobile Optimization**: Responsive design improvements

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Use Prettier for code formatting
- Follow Svelte best practices
- Maintain TypeScript type safety
- Write meaningful commit messages

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [SvelteKit](https://kit.svelte.dev/)
- UI components inspired by [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)

## 📞 Support

For questions, issues, or feature requests:
- Create an issue on GitHub
- Check the documentation
- Review existing discussions

---

**Happy Factory Planning! 🏭✨**
