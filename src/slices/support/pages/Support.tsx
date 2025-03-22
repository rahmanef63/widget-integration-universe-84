
import React from 'react';
import { SupportLayout } from '../components';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Support: React.FC = () => {
  return (
    <SupportLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Documentation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Access comprehensive guides and documentation.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View Docs</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>FAQ</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Find answers to frequently asked questions.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Browse FAQ</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Community</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Join our community for help and discussions.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Join Community</Button>
          </CardFooter>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Submit a Support Ticket</CardTitle>
          <CardDescription>Our team will respond as soon as possible.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="Brief description of your issue" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select defaultValue="medium">
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea 
                id="description" 
                className="w-full px-3 py-2 border rounded-md h-32" 
                placeholder="Detailed description of your issue"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Submit Ticket</Button>
        </CardFooter>
      </Card>
    </SupportLayout>
  );
};

export default Support;
