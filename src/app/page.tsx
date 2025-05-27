"use client";

import { useEffect, useState } from "react";
import { Card } from "@//ui/card";
import { Button } from "@//ui/button";
import { Input } from "@//ui/input";

type Upgrade = {
  text: string;
  isEditing?: boolean;
};

type Project = {
  name: string;
  upgrades: Upgrade[];
  newUpgrade: string;
};

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("projects");
    if (saved) setProjects(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const addProject = () => {
    if (!newProject.trim()) return;
    setProjects([
      ...projects,
      { name: newProject.trim(), upgrades: [], newUpgrade: "" },
    ]);
    setNewProject("");
  };

  const addUpgrade = (index: number) => {
    const text = projects[index].newUpgrade.trim();
    if (!text) return;

    const updated = [...projects];
    updated[index].upgrades.push({ text });
    updated[index].newUpgrade = "";
    setProjects(updated);
  };

  const deleteUpgrade = (pIdx: number, uIdx: number) => {
    const updated = [...projects];
    updated[pIdx].upgrades.splice(uIdx, 1);
    setProjects(updated);
  };

  const toggleEdit = (pIdx: number, uIdx: number) => {
    const updated = [...projects];
    updated[pIdx].upgrades[uIdx].isEditing =
      !updated[pIdx].upgrades[uIdx].isEditing;
    setProjects(updated);
  };

  const updateUpgrade = (pIdx: number, uIdx: number, text: string) => {
    const updated = [...projects];
    updated[pIdx].upgrades[uIdx].text = text;
    setProjects(updated);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 p-4 sm:p-6">
      <div className="max-w-5xl mx-auto space-y-10">
        <h1 className="text-3xl sm:text-5xl font-bold text-center text-gray-100 tracking-tight">
          🚀 Upgrade Tracker
        </h1>

        {/* Add New Project */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
          <Input
            value={newProject}
            onChange={(e) => setNewProject(e.target.value)}
            placeholder="Enter new project name"
            className="text-white  w-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <Button
            onClick={addProject}
            className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow transition"
          >
            Add Project
          </Button>
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, projIdx) => (
            <Card
              key={projIdx}
              className="p-5 bg-white shadow-lg rounded-2xl border border-gray-200"
            >
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                {project.name}
              </h2>

              {/* Add Upgrade */}
              <div className="flex flex-col sm:flex-row gap-2 mb-4">
                <Input
                  value={project.newUpgrade}
                  onChange={(e) => {
                    const updated = [...projects];
                    updated[projIdx].newUpgrade = e.target.value;
                    setProjects(updated);
                  }}
                  placeholder="New upgrade..."
                  className="text-black w-full focus:ring-blue-500 focus:border-blue-500"
                />
                <Button
                  onClick={() => addUpgrade(projIdx)}
                  className="w-full sm:w-auto"
                >
                  Add
                </Button>
              </div>

              {/* Upgrade List */}
              <ul className="space-y-3">
                {project.upgrades.map((upgrade, upgradeIdx) => (
                  <li
                    key={upgradeIdx}
                    className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition px-3 py-2 rounded-md border"
                  >
                    {upgrade.isEditing ? (
                      <input
                        autoFocus
                        value={upgrade.text}
                        onChange={(e) =>
                          updateUpgrade(projIdx, upgradeIdx, e.target.value)
                        }
                        onBlur={() => toggleEdit(projIdx, upgradeIdx)}
                        className="text-black flex-1 mr-2 px-2 py-1 border rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    ) : (
                      <span
                        className="flex-1 cursor-pointer text-gray-700 hover:underline"
                        onClick={() => toggleEdit(projIdx, upgradeIdx)}
                      >
                        {upgrade.text}
                      </span>
                    )}
                    <button
                      onClick={() => deleteUpgrade(projIdx, upgradeIdx)}
                      className="text-red-500 hover:text-red-700 text-xl font-bold ml-3"
                      aria-label="Delete upgrade"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
