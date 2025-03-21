
import React from 'react';
import { motion } from 'framer-motion';

interface SecuritySectionProps {
  inView: boolean;
}

const SecuritySection: React.FC<SecuritySectionProps> = ({ inView }) => {
  return (
    <section id="security" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h2 className="text-2xl md:text-3xl font-display font-medium mb-6 pb-2 border-b">
          Security
        </h2>
        
        <div id="authentication" className="mb-8 scroll-mt-24">
          <h3 className="text-xl font-medium mb-4">Authentication</h3>
          <p className="mb-4 text-muted-foreground">
            The Widget Platform implements enterprise-grade authentication to ensure that only authorized users 
            can access widgets and their data.
          </p>
          <div className="space-y-3 text-muted-foreground">
            <p>Key authentication features include:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>OAuth 2.0 Integration:</strong> Support for standard OAuth flows for widget authorization.</li>
              <li><strong>JWT Tokens:</strong> Secure, short-lived tokens for widget API access.</li>
              <li><strong>SSO Support:</strong> Integration with enterprise single sign-on systems (SAML, OIDC).</li>
              <li><strong>MFA Options:</strong> Multi-factor authentication for sensitive widget operations.</li>
            </ul>
          </div>
        </div>
        
        <div id="permissions" className="mb-8 scroll-mt-24">
          <h3 className="text-xl font-medium mb-4">Permissions</h3>
          <p className="mb-4 text-muted-foreground">
            The permission system provides fine-grained control over what widgets can access and do within the platform.
          </p>
          <div className="space-y-3 text-muted-foreground">
            <p>The permission model includes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Resource Access:</strong> Control which data sources a widget can access.</li>
              <li><strong>Action Permissions:</strong> Limit what operations a widget can perform.</li>
              <li><strong>User Consent:</strong> Explicit user approval for sensitive operations.</li>
              <li><strong>Role-Based Access:</strong> Permissions based on user roles within the organization.</li>
            </ul>
            <div className="p-4 bg-muted rounded-lg my-4">
              <code className="text-sm">
                {`{
  "permissions": [
    "data:read:metrics",
    "api:call:analytics",
    "storage:write:user-preferences",
    "ui:show:notifications"
  ]
}`}
              </code>
            </div>
          </div>
        </div>
        
        <div id="isolation" className="scroll-mt-24">
          <h3 className="text-xl font-medium mb-4">Isolation</h3>
          <p className="mb-4 text-muted-foreground">
            Widget isolation ensures that widgets cannot interfere with each other or with the host application.
          </p>
          <div className="space-y-3 text-muted-foreground">
            <p>Isolation mechanisms include:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Sandboxed Execution:</strong> Widgets run in isolated contexts with limited access to global objects.</li>
              <li><strong>Content Security Policy:</strong> Restrict what resources widgets can load and execute.</li>
              <li><strong>Memory Limits:</strong> Prevent widgets from consuming excessive resources.</li>
              <li><strong>Communication Channels:</strong> Controlled message passing between widgets and the host.</li>
            </ul>
            <p className="mt-4">
              The isolation system implements defense-in-depth principles, with multiple layers of protection to prevent security breaches and ensure widget stability.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default SecuritySection;
