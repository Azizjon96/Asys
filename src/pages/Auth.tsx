import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Building2, LogIn, UserPlus } from "lucide-react";

const Auth = () => {
  const { signIn, signUp, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCreateAdmin, setShowCreateAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await signIn(username, password);
    
    if (error) {
      toast({
        title: "Ошибка входа",
        description: "Неверный логин или пароль",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Успешный вход",
        description: "Добро пожаловать в систему!",
      });
    }

    setLoading(false);
  };

  const handleCreateAdmin = async () => {
    setLoading(true);
    const { error } = await signUp("admin", "azizjun", "Администратор", "", "admin");
    
    if (error) {
      toast({
        title: "Ошибка создания",
        description: error.message || "Не удалось создать администратора",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Администратор создан",
        description: "Логин: admin, Пароль: azizjun",
      });
      setShowCreateAdmin(false);
      setUsername("admin");
      setPassword("azizjun");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Building2 className="w-8 h-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">Система управления недвижимостью</CardTitle>
          <CardDescription>Введите логин и пароль для входа</CardDescription>
        </CardHeader>
        <CardContent>
          {!showCreateAdmin ? (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">
                  <LogIn className="w-4 h-4 inline mr-2" />
                  Логин
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Введите логин"
                  required
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
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Вход..." : "Войти"}
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                className="w-full text-xs text-muted-foreground" 
                onClick={() => setShowCreateAdmin(true)}
              >
                Создать первого администратора
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <p className="text-sm font-medium">Создать администратора:</p>
                <p className="text-sm text-muted-foreground">Логин: admin</p>
                <p className="text-sm text-muted-foreground">Пароль: azizjun</p>
              </div>
              <Button 
                onClick={handleCreateAdmin} 
                className="w-full" 
                disabled={loading}
              >
                <UserPlus className="w-4 h-4 mr-2" />
                {loading ? "Создание..." : "Создать администратора"}
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                className="w-full" 
                onClick={() => setShowCreateAdmin(false)}
              >
                Назад к входу
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
