"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Plus,
  Globe,
  Smartphone,
  Palette,
  Cloud,
  Bot,
  ShieldCheck,
  Check,
  Edit,
  Trash2,
  Clock,
  DollarSign,
  Layers,
  Eye,
  EyeOff,
} from "lucide-react";
import { AdminLayout } from "@/components/shared/AdminLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useAdminStore } from "@/lib/store";
import { Service } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";

const serviceSchema = z.object({
  title: z.string().min(3, "Title is required"),
  category: z.string().min(2, "Category is required"),
  description: z.string().min(10, "Description is required"),
  iconName: z.string().default("Globe"),
  startingPrice: z.coerce.number().min(500, "Starting price must be at least $500"),
  deliveryTime: z.string().min(2, "Delivery time is required"),
  featuresString: z.string().min(5, "Enter comma-separated features"),
  isVisible: z.boolean().default(true),
});

type ServiceFormData = z.infer<typeof serviceSchema>;

// Icon lookup helper
function getServiceIcon(iconName: string) {
  switch (iconName.toLowerCase()) {
    case "smartphone":
      return Smartphone;
    case "palette":
      return Palette;
    case "cloud":
      return Cloud;
    case "bot":
      return Bot;
    case "shieldcheck":
      return ShieldCheck;
    default:
      return Globe;
  }
}

export default function ServicesPage() {
  const services = useAdminStore((state) => state.services);
  const addService = useAdminStore((state) => state.addService);
  const updateService = useAdminStore((state) => state.updateService);
  const deleteService = useAdminStore((state) => state.deleteService);
  const toggleServiceVisibility = useAdminStore((state) => state.toggleServiceVisibility);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Service | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema) as any,
    defaultValues: {
      title: "",
      category: "Engineering",
      description: "",
      iconName: "Globe",
      startingPrice: 25000,
      deliveryTime: "6 - 10 Weeks",
      featuresString: "High performance architecture, Full test coverage, Dedicated team",
      isVisible: true,
    },
  });

  const isVisibleValue = watch("isVisible");

  const handleOpenAdd = () => {
    setEditingService(null);
    reset({
      title: "",
      category: "Engineering",
      description: "",
      iconName: "Globe",
      startingPrice: 30000,
      deliveryTime: "6 - 12 Weeks",
      featuresString: "Modern stack, Responsive design, 99.9% uptime SLA, Continuous integration",
      isVisible: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (srv: Service) => {
    setEditingService(srv);
    reset({
      title: srv.title,
      category: srv.category,
      description: srv.description,
      iconName: srv.iconName,
      startingPrice: srv.startingPrice,
      deliveryTime: srv.deliveryTime,
      featuresString: srv.features.join(", "),
      isVisible: srv.isVisible,
    });
    setIsModalOpen(true);
  };

  const onSubmit = (data: ServiceFormData) => {
    const featuresArray = data.featuresString
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean);

    if (editingService) {
      updateService(editingService.id, {
        title: data.title,
        category: data.category,
        description: data.description,
        iconName: data.iconName,
        startingPrice: data.startingPrice,
        deliveryTime: data.deliveryTime,
        features: featuresArray,
        isVisible: data.isVisible,
      });
      toast.success(`Service '${data.title}' updated`);
    } else {
      addService({
        title: data.title,
        category: data.category,
        description: data.description,
        iconName: data.iconName,
        startingPrice: data.startingPrice,
        deliveryTime: data.deliveryTime,
        features: featuresArray,
        isVisible: data.isVisible,
        activeProjectsCount: 1,
      });
      toast.success(`Service '${data.title}' created`);
    }
    setIsModalOpen(false);
  };

  const handleToggle = (id: string, currentVal: boolean, title: string) => {
    toggleServiceVisibility(id);
    toast.success(
      currentVal
        ? `'${title}' hidden from public website`
        : `'${title}' is now live on public website`
    );
  };

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      deleteService(deleteTarget.id);
      toast.success(`Service '${deleteTarget.title}' removed`);
      setDeleteTarget(null);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <PageHeader
          title="Services Catalog"
          description="Manage public-facing service offerings, deliverables, pricing tiers, and website visibility."
        >
          <Button size="sm" onClick={handleOpenAdd} className="shadow-xs">
            <Plus className="h-4 w-4 mr-1.5" />
            Add Service
          </Button>
        </PageHeader>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((srv) => {
            const IconComponent = getServiceIcon(srv.iconName);

            return (
              <Card
                key={srv.id}
                className={`hover:border-slate-300 transition-all flex flex-col justify-between ${
                  !srv.isVisible ? "opacity-75 bg-slate-50/50" : ""
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600">
                      <IconComponent className="h-6 w-6" />
                    </div>

                    <div className="flex items-center gap-2">
                      {srv.isVisible ? (
                        <Badge variant="success" className="text-[10px]">
                          Live on Web
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="text-[10px]">
                          Hidden
                        </Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="iconSm"
                        onClick={() => handleOpenEdit(srv)}
                      >
                        <Edit className="h-3.5 w-3.5 text-slate-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="iconSm"
                        onClick={() => setDeleteTarget(srv)}
                        className="hover:text-rose-600"
                      >
                        <Trash2 className="h-3.5 w-3.5 text-slate-400 hover:text-rose-600" />
                      </Button>
                    </div>
                  </div>

                  <CardTitle className="text-base mt-3">{srv.title}</CardTitle>
                  <CardDescription className="text-xs">{srv.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 pt-0 text-xs">
                  {/* Pricing and Timeline pill */}
                  <div className="flex items-center justify-between rounded-lg bg-slate-50 p-2.5 border border-slate-100">
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-slate-400">
                        Starting At
                      </span>
                      <p className="font-bold text-slate-900 text-sm">
                        {formatCurrency(srv.startingPrice)}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-semibold text-slate-400">
                        Timeline
                      </span>
                      <p className="font-medium text-slate-700">{srv.deliveryTime}</p>
                    </div>
                  </div>

                  {/* Features list */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                      Included Capabilities
                    </span>
                    <ul className="space-y-1 text-slate-600">
                      {srv.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="leading-tight">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Toggle Switch Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <span className="text-xs font-medium text-slate-600">
                      Show on Website
                    </span>
                    <Switch
                      checked={srv.isVisible}
                      onCheckedChange={() =>
                        handleToggle(srv.id, srv.isVisible, srv.title)
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Add/Edit Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {editingService ? "Edit Service Offering" : "Add New Service Offering"}
              </DialogTitle>
              <DialogDescription>
                Configure service pricing, delivery timelines, and website visibility.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Service Title</label>
                <Input placeholder="Web Development" {...register("title")} />
                {errors.title && (
                  <p className="text-xs text-rose-600">{errors.title.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Category</label>
                  <Input placeholder="Engineering, Cloud, AI" {...register("category")} />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Icon</label>
                  <select
                    className="flex h-9 w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-900 shadow-xs focus:outline-none focus:border-indigo-500"
                    {...register("iconName")}
                  >
                    <option value="Globe">Globe (Web)</option>
                    <option value="Smartphone">Smartphone (Mobile)</option>
                    <option value="Palette">Palette (UI/UX)</option>
                    <option value="Cloud">Cloud (DevOps)</option>
                    <option value="Bot">Bot (AI Solutions)</option>
                    <option value="ShieldCheck">ShieldCheck (Security)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Starting Price ($)
                  </label>
                  <Input type="number" {...register("startingPrice")} />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Estimated Delivery
                  </label>
                  <Input placeholder="6 - 12 Weeks" {...register("deliveryTime")} />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Description</label>
                <Textarea
                  rows={2}
                  placeholder="Overview of the engineering capability..."
                  {...register("description")}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">
                  Capabilities & Features (comma-separated)
                </label>
                <Textarea
                  rows={2}
                  placeholder="Next.js edge runtime, TypeScript, Automated CI/CD, Design tokens"
                  {...register("featuresString")}
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="text-xs font-semibold text-slate-700">
                  Visible on Public Website
                </label>
                <Switch
                  checked={isVisibleValue}
                  onCheckedChange={(val) => setValue("isVisible", val)}
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
                  {editingService ? "Save Changes" : "Create Service"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Dialog */}
        <ConfirmDialog
          open={!!deleteTarget}
          onOpenChange={(open) => !open && setDeleteTarget(null)}
          title="Delete Service Offering?"
          description={`Are you sure you want to delete '${deleteTarget?.title}'? It will no longer appear in the marketing catalog.`}
          confirmText="Yes, Delete Service"
          onConfirm={handleConfirmDelete}
        />
      </div>
    </AdminLayout>
  );
}
