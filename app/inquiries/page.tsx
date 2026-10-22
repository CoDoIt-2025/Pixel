"use client";

import React, { useState, useMemo } from "react";
import {
  Mail,
  Search,
  CheckCircle2,
  AlertCircle,
  Clock,
  Send,
  Trash2,
  Building2,
  DollarSign,
  User,
  ArrowRight,
  X,
  MessageSquare,
} from "lucide-react";
import { AdminLayout } from "@/components/shared/AdminLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useAdminStore } from "@/lib/store";
import { Inquiry, InquiryStatus } from "@/types";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";

const STATUS_TABS = ["ALL", "New", "In Progress", "Resolved", "Spam"];

export default function InquiriesPage() {
  const inquiries = useAdminStore((state) => state.inquiries);
  const updateInquiryStatus = useAdminStore((state) => state.updateInquiryStatus);
  const replyToInquiry = useAdminStore((state) => state.replyToInquiry);
  const deleteInquiry = useAdminStore((state) => state.deleteInquiry);

  const [activeTab, setActiveTab] = useState("ALL");
  const [search, setSearch] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Inquiry | null>(null);

  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      const matchTab = activeTab === "ALL" || inq.status === activeTab;
      const matchSearch =
        inq.name.toLowerCase().includes(search.toLowerCase()) ||
        inq.company.toLowerCase().includes(search.toLowerCase()) ||
        inq.email.toLowerCase().includes(search.toLowerCase()) ||
        inq.service.toLowerCase().includes(search.toLowerCase());
      return matchTab && matchSearch;
    });
  }, [inquiries, activeTab, search]);

  const handleOpenDetail = (inq: Inquiry) => {
    setSelectedInquiry(inq);
    setReplyMessage("");
  };

  const handleSendReply = () => {
    if (!selectedInquiry) return;
    if (!replyMessage.trim()) {
      toast.error("Please enter a reply message");
      return;
    }

    replyToInquiry(selectedInquiry.id, replyMessage.trim());
    toast.success("Reply dispatched to client!", {
      description: `Inquiry from ${selectedInquiry.name} marked as Resolved.`,
    });

    // Refresh local selected state
    setSelectedInquiry((prev) =>
      prev
        ? {
            ...prev,
            status: "Resolved",
            replies: [
              ...prev.replies,
              {
                id: `rep-${Date.now()}`,
                sender: "Alex Vance (Admin)",
                message: replyMessage.trim(),
                timestamp: new Date().toISOString(),
              },
            ],
          }
        : null
    );
    setReplyMessage("");
  };

  const handleChangeStatus = (id: string, newStatus: InquiryStatus) => {
    updateInquiryStatus(id, newStatus);
    if (selectedInquiry?.id === id) {
      setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
    toast.success(`Inquiry status set to '${newStatus}'`);
  };

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      deleteInquiry(deleteTarget.id);
      if (selectedInquiry?.id === deleteTarget.id) {
        setSelectedInquiry(null);
      }
      toast.success("Inquiry submission deleted");
      setDeleteTarget(null);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <PageHeader
          title="Client Inquiries & Contact Forms"
          description="Inbound partnership proposals, technical consultation requests, and scope questionnaires."
        />

        {/* Filter Tabs & Search */}
        <div className="flex flex-col gap-3 rounded-xl border border-slate-200/90 bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-1.5">
            {STATUS_TABS.map((tab) => {
              const count =
                tab === "ALL"
                  ? inquiries.length
                  : inquiries.filter((i) => i.status === tab).length;

              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                    activeTab === tab
                      ? "bg-indigo-600 text-white shadow-xs font-semibold"
                      : "bg-slate-100/70 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900"
                  }`}
                >
                  <span>{tab === "ALL" ? "All Inquiries" : tab}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                      activeTab === tab
                        ? "bg-indigo-700 text-white"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search contact, company, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 text-xs"
            />
          </div>
        </div>

        {/* Inquiries Table */}
        <Card className="overflow-hidden">
          {filteredInquiries.length === 0 ? (
            <EmptyState
              title="No inquiries found"
              description="No contact submissions match your current filter parameters."
              icon={Mail}
              actionText="Reset Filter"
              onAction={() => {
                setActiveTab("ALL");
                setSearch("");
              }}
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/70 text-slate-500 border-b border-slate-100 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Sender & Company</th>
                    <th className="py-3 px-4">Service Required</th>
                    <th className="py-3 px-4">Budget Range</th>
                    <th className="py-3 px-4">Received</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredInquiries.map((inq) => (
                    <tr
                      key={inq.id}
                      onClick={() => handleOpenDetail(inq)}
                      className={`hover:bg-slate-50/70 transition-colors cursor-pointer ${
                        inq.status === "New" ? "bg-indigo-50/20 font-medium" : ""
                      }`}
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-900">{inq.name}</div>
                        <div className="text-[11px] text-slate-500">
                          {inq.company} &bull; {inq.email}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-700 font-medium">
                        {inq.service}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-900">
                        {inq.budget}
                      </td>
                      <td className="py-3.5 px-4 text-slate-500">
                        {formatDate(inq.date)}
                      </td>
                      <td className="py-3.5 px-4">
                        <StatusBadge status={inq.status} size="sm" />
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div
                          className="flex items-center justify-end gap-1.5"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 text-xs text-indigo-600 hover:text-indigo-700"
                            onClick={() => handleOpenDetail(inq)}
                          >
                            View & Reply
                          </Button>
                          <Button
                            variant="ghost"
                            size="iconSm"
                            onClick={() => setDeleteTarget(inq)}
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
          )}
        </Card>

        {/* Detail & Reply Drawer / Modal */}
        <Dialog
          open={!!selectedInquiry}
          onOpenChange={(open) => !open && setSelectedInquiry(null)}
        >
          <DialogContent className="sm:max-w-[620px]">
            {selectedInquiry && (
              <div className="space-y-4">
                <DialogHeader className="border-b border-slate-100 pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <DialogTitle className="text-lg">
                        Inquiry from {selectedInquiry.name}
                      </DialogTitle>
                      <DialogDescription className="text-xs mt-0.5">
                        {selectedInquiry.company} &bull; {selectedInquiry.email} &bull; Received{" "}
                        {formatDate(selectedInquiry.date)}
                      </DialogDescription>
                    </div>
                    <StatusBadge status={selectedInquiry.status} />
                  </div>
                </DialogHeader>

                {/* Scope & Budget Pills */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-100">
                    <span className="text-[10px] uppercase font-semibold text-slate-400">
                      Requested Service
                    </span>
                    <p className="font-semibold text-slate-800 mt-0.5">
                      {selectedInquiry.service}
                    </p>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-100">
                    <span className="text-[10px] uppercase font-semibold text-slate-400">
                      Target Budget
                    </span>
                    <p className="font-semibold text-slate-800 mt-0.5">
                      {selectedInquiry.budget}
                    </p>
                  </div>
                </div>

                {/* Message Body */}
                <div className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-4 text-xs leading-relaxed text-slate-800">
                  <span className="font-semibold text-slate-900 block mb-1">
                    Client Message:
                  </span>
                  {selectedInquiry.message}
                </div>

                {/* Previous replies thread */}
                {selectedInquiry.replies.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-slate-700">
                      Communication Thread
                    </span>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {selectedInquiry.replies.map((reply) => (
                        <div
                          key={reply.id}
                          className="rounded-lg border border-indigo-100 bg-indigo-50/40 p-3 text-xs"
                        >
                          <div className="flex items-center justify-between text-[11px] font-semibold text-indigo-900 mb-1">
                            <span>{reply.sender}</span>
                            <span className="text-slate-400 font-normal">
                              {formatDate(reply.timestamp)}
                            </span>
                          </div>
                          <p className="text-slate-700 leading-relaxed">
                            {reply.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reply Form */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <label className="text-xs font-semibold text-slate-700">
                    Compose Official Reply
                  </label>
                  <Textarea
                    rows={3}
                    placeholder={`Write response to ${selectedInquiry.name} (${selectedInquiry.email})...`}
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                  />
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-slate-500">Change Status:</span>
                      <select
                        value={selectedInquiry.status}
                        onChange={(e) =>
                          handleChangeStatus(
                            selectedInquiry.id,
                            e.target.value as InquiryStatus
                          )
                        }
                        className="h-8 rounded-md border border-slate-200 text-xs px-2 bg-white"
                      >
                        <option value="New">New</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Spam">Spam</option>
                      </select>
                    </div>

                    <Button size="sm" onClick={handleSendReply}>
                      <Send className="h-3.5 w-3.5 mr-1.5" />
                      Send Reply &amp; Resolve
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Dialog */}
        <ConfirmDialog
          open={!!deleteTarget}
          onOpenChange={(open) => !open && setDeleteTarget(null)}
          title="Delete Inquiry?"
          description={`Are you sure you want to remove the contact inquiry from '${deleteTarget?.company}'?`}
          confirmText="Yes, Delete Inquiry"
          onConfirm={handleConfirmDelete}
        />
      </div>
    </AdminLayout>
  );
}
