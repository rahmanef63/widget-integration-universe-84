
import { IconOption } from "../types";

// Define icon categories for better organization
export enum IconCategory {
  NAVIGATION = "Navigation & UI",
  ACTIONS = "Actions & Controls",
  USERS = "Users & Organizations",
  CONTENT = "Content & Media",
  LAYOUT = "Layout & Views",
  DEVELOPMENT = "Development",
  DEVICES = "Devices & Hardware",
  CONNECTIVITY = "Connectivity",
  DATA = "Data & Analytics",
  FINANCE = "Finance",
  COMMUNICATION = "Communication",
  TIME = "Time & Calendar",
  STATUS = "Status & Notifications",
  SECURITY = "Security",
  POWER = "Power & Energy",
  COMMERCE = "Shopping & Commerce",
  STARTUP = "Startup & Business",
  TECHNOLOGY = "Technology & Development",
  GENERAL = "General",
  DASHBOARD = "Dashboard Specific"
}

// Interface for categorized icon options
export interface CategorizedIconOptions {
  category: IconCategory;
  icons: IconOption[];
}

// Helper to get icons by category
export const getIconsByCategory = (
  allIcons: IconOption[],
  category: IconCategory
): IconOption[] => {
  return iconCategoryMap[category].map(iconName => {
    const icon = allIcons.find(icon => icon.name === iconName);
    if (!icon) {
      console.warn(`Icon ${iconName} not found in icon options.`);
      return null;
    }
    return icon;
  }).filter(Boolean) as IconOption[];
};

// Map of icon names to categories for classification
export const iconCategoryMap: Record<IconCategory, string[]> = {
  [IconCategory.NAVIGATION]: [
    "Home", "Menu", "Layout", "LayoutDashboard", "ChevronRight", 
    "ChevronDown", "ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"
  ],
  [IconCategory.ACTIONS]: [
    "Edit", "Trash", "Trash2", "PlusCircle", "Plus", "Minus", "X", 
    "Check", "CheckSquare", "Save", "Eye", "EyeOff"
  ],
  [IconCategory.USERS]: [
    "User", "Users", "CircleUser", "UserCircle", "Building", 
    "UserPlus", "UserMinus", "UserCheck", "UserX"
  ],
  [IconCategory.CONTENT]: [
    "File", "Files", "FileText", "FileCode", "FilePlus", "FileEdit", 
    "FileMinus", "Image", "Video", "Music", "Folder", "FolderOpen", 
    "FolderTree", "FolderPlus", "FolderMinus"
  ],
  [IconCategory.LAYOUT]: [
    "Table", "TableProperties", "Grid", "List", "ListTodo", 
    "Kanban", "Trello", "ClipboardList", "Columns", "Layout", 
    "LayoutList", "LayoutTemplate"
  ],
  [IconCategory.DEVELOPMENT]: [
    "Code", "Terminal", "GitBranch", "Github", "GitCommit", 
    "GitPullRequest", "GitMerge", "Workflow"
  ],
  [IconCategory.DEVICES]: [
    "Monitor", "Laptop", "Tablet", "Smartphone", "Server", 
    "HardDrive", "Cpu", "MousePointer", "Keyboard", "Printer"
  ],
  [IconCategory.CONNECTIVITY]: [
    "Wifi", "Bluetooth", "Globe", "Globe2", "Network", "Share2", 
    "Signal", "Cast", "ExternalLink", "Link"
  ],
  [IconCategory.DATA]: [
    "Database", "PieChart", "BarChart", "LineChart", "ChartPie", 
    "ChartBar", "ChartLine", "TrendingUp", "Activity", "Gauge",
    "PieChartIcon", "BarChart2", "TrendingDown", "AreaChart"
  ],
  [IconCategory.FINANCE]: [
    "DollarSign", "CreditCard", "Wallet", "Receipt", "Calculator", 
    "Percent"
  ],
  [IconCategory.COMMUNICATION]: [
    "Mail", "MessageCircle", "MessageSquare", "Send", "Share", 
    "Link", "AtSign", "Hash", "Mailbox", "Inbox"
  ],
  [IconCategory.TIME]: [
    "Calendar", "Clock", "Timer", "TimerReset"
  ],
  [IconCategory.STATUS]: [
    "Bell", "BellRing", "BellPlus", "BellMinus", "AlertTriangle", 
    "AlertCircle", "Info", "AlertOctagon"
  ],
  [IconCategory.SECURITY]: [
    "ShieldCheck", "Shield", "ShieldAlert", "Lock", "Unlock", "Key"
  ],
  [IconCategory.POWER]: [
    "Battery", "Power", "Zap"
  ],
  [IconCategory.COMMERCE]: [
    "ShoppingCart", "Package", "Boxes", "Box", "Store"
  ],
  [IconCategory.STARTUP]: [
    "Store", "Rocket", "Sparkles", "Lightbulb", "Puzzle", "Target", 
    "Crosshair", "Compass", "Factory", "Building2", "Blocks", 
    "AppWindow", "Maximize", "Briefcase"
  ],
  [IconCategory.TECHNOLOGY]: [
    "Bot", "Brain", "Cpu", "CircuitBoard", "Workflow", "GitPullRequest", 
    "Boxes", "Command", "Layers"
  ],
  [IconCategory.GENERAL]: [
    "Search", "Map", "Phone", "Camera", "Download", "Upload", 
    "RefreshCw", "RotateCw", "RotateCcw", "Settings", "Settings2", 
    "Wrench", "Tag", "Tags", "Bookmark", "Flag", "Award", "Cog", 
    "HelpCircle", "Copy", "Move", "Maximize2", "Minimize2", "ZoomIn", 
    "ZoomOut", "Navigation2", "Droplet", "Paperclip", "Mic", "Volume1", 
    "Volume2", "VolumeX", "Speaker", "Tv", "Command", "Compass", "Map"
  ],
  [IconCategory.DASHBOARD]: [
    "Heart", "GraduationCap", "Bookmark", "Palette", "BookOpen", 
    "BookMarked", "Library", "FlagTriangleRight", "Award"
  ]
};
