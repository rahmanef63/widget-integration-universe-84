
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DocSection } from '../../types';
import { renderIcon } from '@/shared/icon-picker/utils';

interface DocSidebarProps {
  filteredSections: DocSection[];
  activeSection: string;
  handleSectionClick: (sectionId: string) => void;
  isScrolled: boolean;
}

const DocSidebar: React.FC<DocSidebarProps> = ({ 
  filteredSections, 
  activeSection, 
  handleSectionClick,
  isScrolled
}) => {
  return (
    <aside className={cn(
      "lg:w-64 flex-shrink-0 overflow-y-auto pb-10 transition-all duration-300",
      isScrolled ? "lg:sticky lg:top-24 lg:max-h-[calc(100vh-6rem)]" : "lg:sticky lg:top-32 lg:max-h-[calc(100vh-8rem)]"
    )}>
      <nav className="space-y-1">
        {filteredSections.map((section) => (
          <div key={section.id} className="mb-4">
            <button
              onClick={() => handleSectionClick(section.id)}
              className={cn(
                "flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                activeSection === section.id
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-secondary text-foreground/80 hover:text-foreground"
              )}
            >
              {section.icon && (
                <span className="mr-2">
                  {renderIcon(section.icon, { size: 18 })}
                </span>
              )}
              <span>{section.title}</span>
              {activeSection === section.id && (
                <ChevronRight className="ml-auto h-4 w-4" />
              )}
            </button>
            
            <AnimatePresence>
              {activeSection === section.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-6 mt-1 space-y-1"
                >
                  {section.subsections.map((subsection) => (
                    <button
                      key={subsection.id}
                      onClick={() => handleSectionClick(`${section.id}-${subsection.id}`)}
                      className="w-full flex items-center px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
                    >
                      {subsection.title}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default DocSidebar;
