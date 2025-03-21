
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useInView } from 'react-intersection-observer';

interface Node {
  id: string;
  label: string;
  description: string;
  x: number;
  y: number;
  color: string;
  radius: number;
  group: string;
}

interface Connection {
  source: string;
  target: string;
  label?: string;
}

const nodes: Node[] = [
  // Widget Provider Ecosystem
  { id: 'a1', label: 'Widget Development', description: 'Create standardized widget components', x: 150, y: 120, color: '#3B82F6', radius: 40, group: 'provider' },
  { id: 'a2', label: 'Component Library', description: 'Reusable UI components', x: 250, y: 150, color: '#3B82F6', radius: 35, group: 'provider' },
  { id: 'a3', label: 'Testing Framework', description: 'Automated testing tools', x: 180, y: 220, color: '#3B82F6', radius: 35, group: 'provider' },
  { id: 'a4', label: 'CI/CD Pipeline', description: 'Automated deployment', x: 280, y: 260, color: '#3B82F6', radius: 40, group: 'provider' },
  
  // Widget Store Platform
  { id: 'b1', label: 'API Gateway', description: 'Central access point', x: 450, y: 120, color: '#10B981', radius: 40, group: 'store' },
  { id: 'b2', label: 'Widget Registry', description: 'Widget metadata storage', x: 520, y: 180, color: '#10B981', radius: 35, group: 'store' },
  { id: 'b3', label: 'CDN Distribution', description: 'Global content delivery', x: 580, y: 120, color: '#10B981', radius: 35, group: 'store' },
  { id: 'b4', label: 'Analytics Platform', description: 'Usage metrics and insights', x: 560, y: 250, color: '#10B981', radius: 40, group: 'store' },
  
  // Dashboard Integration
  { id: 'c1', label: 'Next.js Application', description: 'Frontend framework', x: 800, y: 130, color: '#8B5CF6', radius: 40, group: 'dashboard' },
  { id: 'c2', label: 'Integration Layer', description: 'Widget loading interface', x: 750, y: 210, color: '#8B5CF6', radius: 35, group: 'dashboard' },
  { id: 'c3', label: 'Sandbox Environment', description: 'Isolated execution', x: 850, y: 210, color: '#8B5CF6', radius: 35, group: 'dashboard' },
  { id: 'c4', label: 'Performance Monitoring', description: 'Real-time analytics', x: 800, y: 280, color: '#8B5CF6', radius: 40, group: 'dashboard' },
  
  // Cross-platform Services
  { id: 'd1', label: 'Identity Provider', description: 'Authentication service', x: 450, y: 380, color: '#EC4899', radius: 40, group: 'services' },
  { id: 'd2', label: 'Distributed Logging', description: 'Centralized logging', x: 580, y: 380, color: '#EC4899', radius: 35, group: 'services' },
];

const connections: Connection[] = [
  { source: 'a1', target: 'a2' },
  { source: 'a1', target: 'a3' },
  { source: 'a2', target: 'a4' },
  { source: 'a3', target: 'a4' },
  { source: 'a4', target: 'b1' },
  
  { source: 'b1', target: 'b2' },
  { source: 'b2', target: 'b3' },
  { source: 'b2', target: 'b4' },
  
  { source: 'b3', target: 'c1' },
  { source: 'c1', target: 'c2' },
  { source: 'c2', target: 'c3' },
  { source: 'c3', target: 'c4' },
  
  { source: 'd1', target: 'b1' },
  { source: 'd1', target: 'c1' },
  { source: 'd2', target: 'b4' },
  { source: 'd2', target: 'c4' },
];

const ArchitectureDiagram: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const svgRef = useRef<SVGSVGElement>(null);
  
  const handleNodeClick = (nodeId: string) => {
    setActiveNode(activeNode === nodeId ? null : nodeId);
  };

  // Get all connections that involve the active node
  const getActiveConnections = () => {
    if (!activeNode) return [];
    return connections.filter(conn => 
      conn.source === activeNode || conn.target === activeNode
    );
  };

  const activeConnections = activeNode ? getActiveConnections() : [];
  
  // Check if a node is connected to the active node
  const isConnectedToActive = (nodeId: string) => {
    if (!activeNode) return false;
    return activeConnections.some(conn => 
      (conn.source === nodeId && conn.target === activeNode) || 
      (conn.source === activeNode && conn.target === nodeId)
    );
  };

  return (
    <div ref={ref} className="w-full h-[600px] relative overflow-hidden p-4 rounded-2xl border border-white/10 glassmorphism shadow-xl">
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Background decorative elements */}
        <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-primary/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-blue-500/10 rounded-full filter blur-3xl" />
      </motion.div>

      <svg 
        ref={svgRef}
        className="w-full h-full" 
        viewBox="0 0 1000 500"
      >
        {/* Group Labels */}
        <g className="diagram-labels">
          <motion.text
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            x="180" y="60" 
            textAnchor="middle" 
            className="fill-current text-foreground font-display font-medium text-lg"
          >
            Widget Provider
          </motion.text>
          
          <motion.text
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            x="520" y="60" 
            textAnchor="middle" 
            className="fill-current text-foreground font-display font-medium text-lg"
          >
            Widget Store
          </motion.text>
          
          <motion.text
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            x="800" y="60" 
            textAnchor="middle" 
            className="fill-current text-foreground font-display font-medium text-lg"
          >
            Dashboard
          </motion.text>
          
          <motion.text
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            x="520" y="330" 
            textAnchor="middle" 
            className="fill-current text-foreground font-display font-medium text-lg"
          >
            Cross-Platform Services
          </motion.text>
        </g>
        
        {/* Connections */}
        <g className="connections">
          {connections.map((connection, index) => {
            const source = nodes.find(n => n.id === connection.source)!;
            const target = nodes.find(n => n.id === connection.target)!;
            
            const isActiveConnection = activeNode && 
              (connection.source === activeNode || connection.target === activeNode);
            
            return (
              <motion.line
                key={`${source.id}-${target.id}`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { 
                  pathLength: 1, 
                  opacity: isActiveConnection ? 0.9 : activeNode ? 0.1 : 0.3,
                  strokeWidth: isActiveConnection ? 2 : 1
                } : { pathLength: 0, opacity: 0 }}
                transition={{ 
                  duration: 1.5, 
                  delay: 0.5 + index * 0.02,
                  ease: "easeInOut"
                }}
                x1={source.x}
                y1={source.y}
                x2={target.x}
                y2={target.y}
                stroke={isActiveConnection ? source.color : "#94a3b8"}
                strokeLinecap="round"
                strokeDasharray="6 3"
                className="transition-all duration-300"
              />
            );
          })}
        </g>
        
        {/* Nodes */}
        <g className="nodes">
          {nodes.map((node, index) => {
            const isActive = activeNode === node.id;
            const isConnected = isConnectedToActive(node.id);
            const isFaded = activeNode && !isActive && !isConnected;
            
            return (
              <g key={node.id} className="cursor-pointer" onClick={() => handleNodeClick(node.id)}>
                <motion.circle
                  initial={{ scale: 0, opacity: 0 }}
                  animate={inView ? { 
                    scale: 1, 
                    opacity: isFaded ? 0.4 : 1,
                    r: isActive ? node.radius + 5 : node.radius
                  } : { scale: 0, opacity: 0 }}
                  transition={{ 
                    duration: 0.7, 
                    delay: 0.3 + index * 0.05,
                    ease: "backOut"
                  }}
                  cx={node.x}
                  cy={node.y}
                  fill={isActive || isConnected ? node.color : `${node.color}50`}
                  opacity={isActive ? 0.9 : isConnected ? 0.7 : 0.5}
                  className="transition-all duration-300"
                />
                
                <motion.text
                  initial={{ opacity: 0 }}
                  animate={inView ? { 
                    opacity: isFaded ? 0.4 : 1,
                    fontSize: isActive ? 12 : 10
                  } : { opacity: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.8 + index * 0.05
                  }}
                  x={node.x}
                  y={node.y}
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  className="fill-white font-medium pointer-events-none"
                >
                  {node.label.split(' ').length > 1 
                    ? node.label.split(' ')[0] 
                    : node.label}
                </motion.text>
                
                {isActive && (
                  <motion.foreignObject
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    x={node.x - 100}
                    y={node.y + node.radius + 10}
                    width="200"
                    height="80"
                    className="pointer-events-none"
                  >
                    <div className="glassmorphism p-2 rounded-lg text-xs text-center">
                      <div className="font-medium">{node.label}</div>
                      <div className="text-muted-foreground mt-1">{node.description}</div>
                    </div>
                  </motion.foreignObject>
                )}
              </g>
            );
          })}
        </g>
      </svg>
      
      <div className="absolute bottom-4 right-4 text-xs text-muted-foreground">
        Click on nodes to explore connections
      </div>
    </div>
  );
};

export default ArchitectureDiagram;
