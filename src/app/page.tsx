"use client";

import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function Home() {
  const [projects, setProjects] = useState<
    { name: string; upgrades: string[]; newUpgrade: string }[]
  >([]);
  const [newProject, setNewProject] = useState("");

  const addProject = () => {
    if (!newProject.trim()) return;
    setProjects([
      ...projects,
      { name: newProject.trim(), upgrades: [], newUpgrade: "" },
    ]);
    setNewProject("");
  };

  const addUpgrade = (index: number) => {
    const updated = [...projects];
    const upgrade = updated[index].newUpgrade.trim();
    if (!upgrade) return;
    updated[index].upgrades.push(upgrade);
    updated[index].newUpgrade = "";
    setProjects(updated);
  };

  const updateUpgradeInput = (index: number, value: string) => {
    const updated = [...projects];
    updated[index].newUpgrade = value;
    setProjects(updated);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">🛠️ Project Upgrade Tracker</h1>

      <div className="flex gap-2 mb-6">
        <Input
          value={newProject}
          onChange={(e) => setNewProject(e.target.value)}
          placeholder="Enter new project name"
        />
        <Button onClick={addProject}>Add Project</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project, index) => (
          <Card key={index}>
            <CardContent className="p-4 space-y-4">
              <h2 className="text-xl font-semibold">{project.name}</h2>

              <div className="flex gap-2">
                <Input
                  value={project.newUpgrade}
                  onChange={(e) => updateUpgradeInput(index, e.target.value)}
                  placeholder="New upgrade idea"
                />
                <Button onClick={() => addUpgrade(index)}>Add</Button>
              </div>

              <ul className="list-disc pl-5 text-sm text-gray-700">
                {project.upgrades.map((upgrade, i) => (
                  <li key={i}>{upgrade}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
