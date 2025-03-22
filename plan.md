
# Widget Integration Universe - Project Plan

## 1. Project Architecture

We've implemented a vertical slice architecture with:

- **shared/** - Cross-cutting concerns and reusable components
- **slices/** - Feature-specific modules organized by domain

### Folder Structure

```
src/
├── components/          # Global UI components
├── core/                # Core application definitions
│   ├── config/          # Application configuration
│   ├── constants/       # Global constants
│   └── types/           # TypeScript types and interfaces
├── hooks/               # Custom React hooks
├── lib/                 # Utility libraries
├── shared/              # Shared resources across slices
│   ├── components/      # Shared UI components
│   ├── services/        # Shared business logic
│   └── store/           # Global state management
│   └── icon-picker/     # Centralized icon management 
└── slices/              # Feature modules
    ├── home/            # Home page feature
    │   ├── components/  # Home-specific components
    │   ├── constants/   # Home-specific constants
    │   ├── pages/       # Home pages
    │   └── types/       # Home-specific types
    ├── documentation/   # Documentation feature
    │   ├── components/  # Documentation-specific components
    │   ├── constants/   # Documentation-specific constants
    │   ├── pages/       # Documentation pages
    │   └── types/       # Documentation-specific types
    ├── dashboard/       # Dashboard feature
    │   ├── components/  # Dashboard-specific components
    │   ├── constants/   # Dashboard-specific constants
    │   ├── pages/       # Dashboard pages
    │   └── types/       # Dashboard-specific types
    ├── ecosystem/       # Ecosystem feature
    │   ├── components/  # Ecosystem-specific components
    │   ├── constants/   # Ecosystem-specific constants
    │   ├── data/        # Data for the ecosystem
    │   ├── pages/       # Ecosystem pages
    │   └── types/       # Ecosystem-specific types
    └── error/           # Error handling feature
        ├── pages/       # Error pages
        └── types/       # Error-specific types
```

## 2. Current Implementation

- **User Preferences**: Using Context API with LocalStorage persistence
- **Component Design**: Reusable, dynamic components with typed props
- **Animation**: Framer Motion for smooth transitions and effects
- **Responsive Layout**: Mobile-first design using Tailwind CSS
- **UI Components**: Leveraging shadcn/ui for consistent design language
- **API Services**: Prepared for future backend integration
- **Slices Architecture**: Fully implemented across all features
- **Constants Files**: DRY approach with centralized constants for each slice
- **Icon Handling**: Consistent implementation using string-based icon identifiers with the renderIcon utility and categorized icons
- **Type Consistency**: Consistent type definitions across slices with proper inheritance
- **Dashboard Integration**: Implemented dashboard layout and sidebar using shadcn/ui components

## 3. Data Management

Currently, we're using local storage for data persistence. We've implemented API service skeletons to prepare for backend integration.

### Database Schema (Implemented in Types)

```
Widget {
  id: string
  title: string
  description: string
  iconName: string
  category: string
  author: string
  version: string
  createdAt: Date
  updatedAt: Date
  dependencies: string[]
  config: Object
  permissions: string[]
}

UserPreference {
  id: string
  userId: string
  theme: string
  layout: string
  widgets: string[] (references Widget.id)
  createdAt: Date
  updatedAt: Date
}

Dashboard {
  id: string
  name: string
  description: string
  userId: string
  layout: Object
  widgets: Object[] (Widget configs)
  createdAt: Date
  updatedAt: Date
}
```

## 4. Implementation Roadmap

- [x] Project structure setup
- [x] Core UI components
- [x] Home page implementation
- [x] User preferences with LocalStorage
- [x] Widget showcase component
- [x] API service structure
- [x] Type definitions for backend integration
- [x] Component refactoring for better maintainability 
- [x] Refactor to use slices architecture consistently
- [x] Refactor Ecosystem page to use component-based architecture
- [x] Refactor Documentation section into smaller components
- [x] Create Widget Editor/Configurator component
- [x] Extract constants to dedicated files for DRY code
- [x] Fix routing issues between Home and root paths
- [x] Consistent icon implementation across components
- [x] Proper type handling for all components
- [x] Documentation content organization with auto-scrolling
- [x] Icon system refactoring with categorization
- [x] Implement Dashboard layout system with shadcn/ui
- [ ] Backend API integration
- [ ] Database integration
- [ ] User authentication
- [ ] Widget permissions system
- [ ] Advanced widget communication

## 5. Current Focus

Our current focus is completing the feature sections:

1. Implementing Dashboard pages for widget management and configuration
2. Creating a Widget Manager for better organization and discovery
3. Setting up widget data persistence and state management
4. Implementing cross-widget communication via an event bus

## 6. Development Guidelines

- Follow DRY (Don't Repeat Yourself) principles
- Create small, focused components (<100 lines)
- Use TypeScript for type safety
- Document all public APIs and components
- Write tests for critical functionality
- Use Tailwind CSS for styling
- Implement responsive designs for all views
- Extract constants to dedicated files for better maintainability
- Use string-based icon identifiers with the renderIcon utility for consistent icon handling
- Ensure proper type definitions across all components
- Use proper custom hooks for shared logic
- Maintain consistent styling with reusable CSS variables
- Centralize icon management with categorized icon systems
- Use shadcn/ui components for consistent UI design

## 7. Preview & Development

To preview the project:

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The development server will start at http://localhost:8080

## 8. Best Practices Implemented

- Properly typed components using TypeScript
- Responsive design with Tailwind CSS
- Component-based architecture for reusability
- Lazy loading for better performance
- File-based routing using React Router
- Error handling with fallbacks
- Custom hooks for shared logic
- Context API for global state management
- DRY code with constants files for each slice
- Consistent icon handling across components with categorization
- Proper type inheritance and interface design
- Documentation organization with consistent section structure
- Centralized icon management with categorized icons for better organization and discoverability
- Dashboard layout with shadcn/ui sidebar components
- Vertical slice architecture with proper separation of concerns
```
