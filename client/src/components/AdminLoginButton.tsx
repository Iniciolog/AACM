import { useState } from 'react';
import { Settings, X, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { useEditMode } from '@/contexts/EditModeContext';
import { useToast } from '@/hooks/use-toast';

export function AdminLoginButton() {
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { isAuthenticated, login, logout } = useAdminAuth();
  const { isEditMode, toggleEditMode } = useEditMode();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      setShowLogin(false);
      setUsername('');
      setPassword('');
      toast({
        title: 'Вход выполнен',
        description: 'Добро пожаловать в панель администратора',
      });
    } else {
      toast({
        title: 'Ошибка входа',
        description: 'Неверные учетные данные',
        variant: 'destructive',
      });
    }
  };

  const handleLogout = () => {
    if (isEditMode) {
      toggleEditMode();
    }
    logout();
    toast({
      title: 'Выход выполнен',
      description: 'Вы вышли из панели администратора',
    });
  };

  if (isAuthenticated) {
    return (
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2" data-testid="admin-panel" data-admin-panel>
        <Button
          onClick={toggleEditMode}
          variant={isEditMode ? 'default' : 'outline'}
          size="sm"
          className="shadow-lg"
          data-testid="button-toggle-edit"
        >
          <Settings className="w-4 h-4 mr-2" />
          {isEditMode ? 'Выйти из редактора' : 'Редактировать'}
        </Button>
        <Button
          onClick={handleLogout}
          variant="ghost"
          size="sm"
          className="shadow-lg bg-background"
          data-testid="button-logout"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Выйти
        </Button>
      </div>
    );
  }

  return (
    <>
      <Button
        onClick={() => setShowLogin(true)}
        variant="ghost"
        size="icon"
        className="fixed bottom-4 right-4 z-50 shadow-lg bg-background/80 backdrop-blur-sm opacity-50 hover:opacity-100 transition-opacity"
        data-testid="button-admin-login"
      >
        <Settings className="w-4 h-4" />
      </Button>

      {showLogin && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" data-testid="modal-login">
          <Card className="w-full max-w-sm">
            <CardHeader className="flex flex-row items-center justify-between gap-2">
              <CardTitle className="text-lg">Вход администратора</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowLogin(false)}
                data-testid="button-close-login"
              >
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Логин</Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Введите логин"
                    data-testid="input-username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Пароль</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Введите пароль"
                    data-testid="input-password"
                  />
                </div>
                <Button type="submit" className="w-full" data-testid="button-submit-login">
                  Войти
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
