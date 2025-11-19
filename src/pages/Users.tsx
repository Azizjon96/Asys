import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Users = () => {
  const { signUp, userRole } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  // Fetch all users with their roles
  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data: profiles } = await supabase
        .from('profiles')
        .select(`
          *,
          user_roles(role)
        `);
      return profiles || [];
    },
    enabled: userRole === 'admin',
  });

  const createUserMutation = useMutation({
    mutationFn: async (data: { username: string; password: string; fullName: string; phone: string }) => {
      return await signUp(data.username, data.password, data.fullName, data.phone, 'manager');
    },
    onSuccess: () => {
      toast({
        title: "Успешно",
        description: "Менеджер добавлен",
      });
      setUsername("");
      setPassword("");
      setFullName("");
      setPhone("");
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: any) => {
      toast({
        title: "Ошибка",
        description: error.message || "Не удалось добавить менеджера",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    createUserMutation.mutate({ username, password, fullName, phone });
  };

  if (userRole !== 'admin') {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">У вас нет доступа к этой странице</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Управление пользователями</h1>
        <p className="text-muted-foreground">Добавление и управление менеджерами</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Добавить менеджера</CardTitle>
          <CardDescription>Создайте учетную запись для нового менеджера</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="username">Логин</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fullName">Полное имя</Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button type="submit" disabled={createUserMutation.isPending}>
              {createUserMutation.isPending ? "Создание..." : "Добавить менеджера"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Список пользователей</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Загрузка...</p>
          ) : (
            <div className="space-y-2">
              {users?.map((user: any) => (
                <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{user.full_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {user.username} • {user.phone}
                    </p>
                  </div>
                  <div className="text-sm">
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded">
                      {user.user_roles?.[0]?.role || 'Нет роли'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;
