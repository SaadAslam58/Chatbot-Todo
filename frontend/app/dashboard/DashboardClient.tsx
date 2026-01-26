"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { TaskList } from "@/components/tasks/TaskList";
import { CreateTaskDialog } from "@/components/tasks/CreateTaskDialog";
import { ChatWidget } from "@/components/ChatWidget";
import { getUserEmail } from "@/lib/api";
import { Github, Linkedin } from "lucide-react";

export function DashboardClient() {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    // Get user email from localStorage
    const email = getUserEmail();
    if (email !== userEmail) {
      setUserEmail(email);
    }
  }, [userEmail]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <Navbar userEmail={userEmail || undefined} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              My Tasks
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Manage your tasks and stay organized
            </p>
          </div>
          <CreateTaskDialog />
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white/80 p-8 shadow-xl backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/50">
          <TaskList />
        </div>
      </main>

      {/* Floating Chat Widget */}
      <ChatWidget />

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/50 mt-16">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4">
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              © 2026 TodoApp. Built with Next.js and FastAPI.
            </p>
            <div className="flex items-center gap-3">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Made by <span className="font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Saad Aslam</span>
              </p>
        
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
