import React, { useEffect } from "react";
import { PageHeader, StatCard, Card, QuickLinkCard, Button } from "../components/shared";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { increment, decrement, reset, setIncrementAmount } from "../store/slices/counterSlice";
import { setUsers, addUser } from "../store/slices/userSlice";

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const counter = useAppSelector((state) => state.counter);
  const users = useAppSelector((state) => state.users);

  useEffect(() => {
    // Initialize some mock users
    dispatch(setUsers([
      { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
      { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager' },
    ]));
  }, [dispatch]);

  const handleAddRandomUser = () => {
    const randomId = Math.random().toString(36).substr(2, 9);
    dispatch(addUser({
      id: randomId,
      name: `User ${randomId}`,
      email: `user${randomId}@example.com`,
      role: 'User',
    }));
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <PageHeader 
        title="Welcome to WeBoc Transformation" 
        description="Management Portal Dashboard with Redux State Management" 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Users" value={users.totalCount.toString()} icon="👥" color="emerald" />
        <StatCard title="Counter Value" value={counter.value.toString()} icon="🔢" color="blue" />
        <StatCard title="Licenses" value="847" icon="📜" color="purple" />
        <StatCard title="Auctions" value="15" icon="🔨" color="orange" />
      </div>

      {/* Redux Counter Demo */}
      <Card className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Redux Counter Demo</h2>
        <p className="text-gray-600 mb-4">
          Current Count: <span className="text-3xl font-bold text-blue-600">{counter.value}</span>
        </p>
        <div className="flex gap-4 mb-4">
          <Button variant="primary" onClick={() => dispatch(increment())}>
            Increment (+{counter.incrementAmount})
          </Button>
          <Button variant="secondary" onClick={() => dispatch(decrement())}>
            Decrement (-{counter.incrementAmount})
          </Button>
          <Button variant="danger" onClick={() => dispatch(reset())}>
            Reset
          </Button>
        </div>
        <div className="flex gap-4 items-center">
          <label className="text-gray-700">Increment Amount:</label>
          <input
            type="number"
            value={counter.incrementAmount}
            onChange={(e) => dispatch(setIncrementAmount(Number(e.target.value)))}
            className="border border-gray-300 rounded px-3 py-2 w-24"
          />
        </div>
      </Card>

      {/* Redux Users Demo */}
      <Card className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Redux Users Demo</h2>
        <p className="text-gray-600 mb-4">
          Total Users in Store: <span className="text-xl font-bold text-emerald-600">{users.totalCount}</span>
        </p>
        <Button variant="success" onClick={handleAddRandomUser}>
          Add Random User
        </Button>
        <div className="mt-4 space-y-2">
          {users.users.map((user) => (
            <div key={user.id} className="p-3 bg-gray-50 rounded border border-gray-200">
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email} - {user.role}</p>
            </div>
          ))}
        </div>
      </Card>
      
      <Card>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <QuickLinkCard 
            title="Getting Started" 
            description="Learn how to use the portal" 
          />
          <QuickLinkCard 
            title="Documentation" 
            description="Access system documentation" 
          />
          <QuickLinkCard 
            title="Support" 
            description="Get help from our team" 
          />
          <QuickLinkCard 
            title="Settings" 
            description="Configure your preferences" 
          />
        </div>
      </Card>
    </div>
  );
};
