"use client";

import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Plus,
  Search,
  LayoutGrid,
  List,
  Building2,
  Mail,
  Phone,
  Globe,
  MapPin,
  MoreVertical,
  Edit,
  Trash2,
  DollarSign,
  Briefcase,
  ExternalLink,
} from "lucide-react";
import { AdminLayout } from "@/components/shared/AdminLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAdminStore } from "@/lib/store";
import { Client, ClientStatus } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";

const clientSchema = z.object({
  company: z.string().min(2, "Company name is required"),
  contactName: z.string().min(2, "Contact person is required"),
  email: z.string().email("Valid business email required"),
  phone: z.string().min(5, "Contact phone is required"),
  industry: z.string().min(2, "Industry is required"),
  totalSpend: z.coerce.number().min(0, "Total spend cannot be negative"),
  activeProjects: z.coerce.number().min(0),
  status: z.enum(["Active", "Inactive", "Lead"]),
  website: z.string().url("Valid URL required (e.g. https://company.com)"),
  location: z.string().min(2, "Location is required"),
  notes: z.string().optional(),
});

type ClientFormData = z.infer<typeof clientSchema>;

export default function ClientsPage() {
  const clients = useAdminStore((state) => state.clients);
  const addClient = useAdminStore((state) => state.addClient);
  const updateClient = useAdminStore((state) => state.updateClient);
  const deleteClient = useAdminStore((state) => state.deleteClient);

  const [viewMode, setViewMode] = useState<"card" | "table">("card");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Client | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema) as any,
    defaultValues: {
      company: "",
      contactName: "",
      email: "",
      phone: "",
      industry: "Fintech",
      totalSpend: 50000,
      activeProjects: 1,
      status: "Active",
      website: "https://example.com",
      location: "Bengaluru, India",
      notes: "",
    },
  });

  const handleOpenAdd = () => {
    setEditingClient(null);
    reset({
      company: "",
      contactName: "",
      email: "",
      phone: "",
      industry: "Fintech",
      totalSpend: 75000,
      activeProjects: 1,
      status: "Active",
      website: "https://",
      location: "San Francisco, CA",
      notes: "",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (client: Client) => {
    setEditingClient(client);
    reset({
      company: client.company,
      contactName: client.contactName,
      email: client.email,
      phone: client.phone,
      industry: client.industry,
      totalSpend: client.totalSpend,
      activeProjects: client.activeProjects,
      status: client.status,
      website: client.website,
      location: client.location,
      notes: client.notes || "",
    });
    setIsModalOpen(true);
  };

  const onSubmit = (data: ClientFormData) => {
    if (editingClient) {
      updateClient(editingClient.id, data);
      toast.success(`Client '${data.company}' updated`);
    } else {
      addClient({
        ...data,
        logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100",
      });
      toast.success(`Client '${data.company}' added successfully`);
    }
    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      deleteClient(deleteTarget.id);
      toast.success(`Client '${deleteTarget.company}' removed`);
      setDeleteTarget(null);
    }
  };

  const filteredClients = useMemo(() => {
    return clients.filter((c) => {
      const matchSearch =
        c.company.toLowerCase().includes(search.toLowerCase()) ||
        c.contactName.toLowerCase().includes(search.toLowerCase()) ||
        c.industry.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "ALL" || c.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [clients, search, statusFilter]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <PageHeader
          title="Clients & Enterprise Accounts"
          description="Manage client organizations, commercial partnerships, contact leads, and lifetime spend."
        >
          <Button size="sm" onClick={handleOpenAdd} className="shadow-xs">
            <Plus className="h-4 w-4 mr-1.5" />
            Add Client
          </Button>
        </PageHeader>

        {/* Filter & View Mode Bar */}
        <div className="flex flex-col gap-3 rounded-xl border border-slate-200/90 bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search company, contact, or industry..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 text-xs"
            />
          </div>

          <div className="flex items-center gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[130px] h-9 text-xs">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Lead">Lead</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            {/* Toggle Card vs Table */}
            <div className="flex items-center rounded-lg border border-slate-200 p-0.5 bg-slate-50">
              <button
                onClick={() => setViewMode("card")}
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === "card"
                    ? "bg-white text-indigo-600 shadow-2xs font-semibold"
                    : "text-slate-400 hover:text-slate-700"
                }`}
                title="Card View"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === "table"
                    ? "bg-white text-indigo-600 shadow-2xs font-semibold"
                    : "text-slate-400 hover:text-slate-700"
                }`}
                title="Table View"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Display: Card View or Table View */}
        {filteredClients.length === 0 ? (
          <EmptyState
            title="No clients found"
            description="No clients match your filter criteria. Try adjusting your search query."
            icon={Building2}
            actionText="Reset Filters"
            onAction={() => {
              setSearch("");
              setStatusFilter("ALL");
            }}
          />
        ) : viewMode === "card" ? (
          /* Cards Grid */
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredClients.map((client) => (
              <Card
                key={client.id}
                className="hover:border-slate-300 transition-all group flex flex-col justify-between"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100 font-bold text-indigo-600 shrink-0">
                        {client.company.charAt(0)}
                      </div>
                      <div>
                        <CardTitle className="group-hover:text-indigo-600 transition-colors">
                          {client.company}
                        </CardTitle>
                        <p className="text-xs text-slate-500 font-medium">
                          {client.industry}
                        </p>
                      </div>
                    </div>
                    <StatusBadge status={client.status} size="sm" />
                  </div>
                </CardHeader>

                <CardContent className="space-y-3 pt-0 text-xs">
                  <div className="rounded-lg bg-slate-50/80 p-3 space-y-1.5 border border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Contact:</span>
                      <span className="font-semibold text-slate-900">
                        {client.contactName}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Total Spend:</span>
                      <span className="font-bold text-indigo-600">
                        {formatCurrency(client.totalSpend)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Active Projects:</span>
                      <span className="font-semibold text-slate-800">
                        {client.activeProjects}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1 text-slate-500 text-[11px]">
                    <div className="flex items-center gap-2 truncate">
                      <Mail className="h-3 w-3 shrink-0 text-slate-400" />
                      <span className="truncate">{client.email}</span>
                    </div>
                    <div className="flex items-center gap-2 truncate">
                      <MapPin className="h-3 w-3 shrink-0 text-slate-400" />
                      <span className="truncate">{client.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <a
                      href={client.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-indigo-600 hover:underline"
                    >
                      Website
                      <ExternalLink className="h-3 w-3" />
                    </a>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="iconSm"
                        onClick={() => handleOpenEdit(client)}
                        title="Edit client"
                      >
                        <Edit className="h-3.5 w-3.5 text-slate-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="iconSm"
                        onClick={() => setDeleteTarget(client)}
                        title="Delete client"
                        className="hover:text-rose-600"
                      >
                        <Trash2 className="h-3.5 w-3.5 text-slate-400 hover:text-rose-600" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          /* Table View */
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/70 text-slate-500 border-b border-slate-100 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Company</th>
                    <th className="py-3 px-4">Primary Contact</th>
                    <th className="py-3 px-4">Industry</th>
                    <th className="py-3 px-4">Total Spend</th>
                    <th className="py-3 px-4">Projects</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredClients.map((client) => (
                    <tr
                      key={client.id}
                      className="hover:bg-slate-50/70 transition-colors"
                    >
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        {client.company}
                        <div className="text-[11px] font-normal text-slate-400">
                          {client.location}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-700">
                        <div className="font-medium">{client.contactName}</div>
                        <div className="text-[11px] text-slate-400">{client.email}</div>
                      </td>
                      <td className="py-3 px-4 text-slate-600">{client.industry}</td>
                      <td className="py-3 px-4 font-semibold text-indigo-600">
                        {formatCurrency(client.totalSpend)}
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-700">
                        {client.activeProjects} active
                      </td>
                      <td className="py-3 px-4">
                        <StatusBadge status={client.status} size="sm" />
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="iconSm"
                            onClick={() => handleOpenEdit(client)}
                          >
                            <Edit className="h-3.5 w-3.5 text-slate-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="iconSm"
                            onClick={() => setDeleteTarget(client)}
                            className="hover:text-rose-600"
                          >
                            <Trash2 className="h-3.5 w-3.5 text-slate-400 hover:text-rose-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Add/Edit Client Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {editingClient ? "Edit Client Account" : "Add Enterprise Client"}
              </DialogTitle>
              <DialogDescription>
                Maintain organization profile, point of contact, and account status.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 pt-2">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Company Name
                  </label>
                  <Input placeholder="Acme Corp" {...register("company")} />
                  {errors.company && (
                    <p className="text-xs text-rose-600">{errors.company.message}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Industry
                  </label>
                  <Input placeholder="Fintech, SaaS, Retail" {...register("industry")} />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Primary Contact
                  </label>
                  <Input placeholder="John Doe" {...register("contactName")} />
                  {errors.contactName && (
                    <p className="text-xs text-rose-600">{errors.contactName.message}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Work Email
                  </label>
                  <Input placeholder="john@acme.com" {...register("email")} />
                  {errors.email && (
                    <p className="text-xs text-rose-600">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Phone</label>
                  <Input placeholder="+1 (415) 555-0199" {...register("phone")} />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Location</label>
                  <Input placeholder="San Francisco, CA" {...register("location")} />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Total Spend ($)
                  </label>
                  <Input type="number" {...register("totalSpend")} />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Active Projects
                  </label>
                  <Input type="number" {...register("activeProjects")} />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Status</label>
                  <select
                    className="flex h-9 w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-900 shadow-xs focus:outline-none focus:border-indigo-500"
                    {...register("status")}
                  >
                    <option value="Active">Active</option>
                    <option value="Lead">Lead</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">
                  Website URL
                </label>
                <Input placeholder="https://company.com" {...register("website")} />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">
                  Internal Notes
                </label>
                <Textarea
                  rows={2}
                  placeholder="Key account details, procurement terms, etc."
                  {...register("notes")}
                />
              </div>

              <DialogFooter className="pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" size="sm">
                  {editingClient ? "Save Changes" : "Add Client"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Dialog */}
        <ConfirmDialog
          open={!!deleteTarget}
          onOpenChange={(open) => !open && setDeleteTarget(null)}
          title="Remove Client Account?"
          description={`Are you sure you want to remove '${deleteTarget?.company}'? This will not delete historical project records.`}
          confirmText="Yes, Remove Client"
          onConfirm={handleConfirmDelete}
        />
      </div>
    </AdminLayout>
  );
}
