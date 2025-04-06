
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';

const Profile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container max-w-2xl px-4 py-12">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
          <p className="text-muted-foreground">Manage your account settings</p>
        </header>

        <div className="bg-card rounded-lg p-6 shadow-sm mb-6">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-primary/10 rounded-full p-6">
              <User size={48} className="text-primary" />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
              <p className="text-lg">{user?.email}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">User ID</h3>
              <p className="text-sm font-mono bg-muted p-2 rounded">{user?.id}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button 
            variant="destructive" 
            onClick={handleSignOut}
            className="gap-2"
          >
            <LogOut size={16} />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
