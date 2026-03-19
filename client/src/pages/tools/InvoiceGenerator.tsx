import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ToolPage from "@/components/ToolPage";
import { Receipt, Plus, Trash2, Download } from "lucide-react";
import { toast } from "sonner";

interface LineItem { description: string; qty: number; rate: number; }

export default function InvoiceGeneratorPage() {
  const [from, setFrom] = useState("Your Business\nyouremail@example.com\n+1 555 123 4567");
  const [to, setTo] = useState("Client Name\nclient@example.com");
  const [invoiceNo, setInvoiceNo] = useState("INV-001");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [dueDate, setDueDate] = useState("");
  const [items, setItems] = useState<LineItem[]>([
    { description: "Web Design", qty: 1, rate: 500 },
    { description: "SEO Optimization", qty: 3, rate: 150 },
  ]);
  const [notes, setNotes] = useState("Thank you for your business!");
  const [currency, setCurrency] = useState("$");

  const addItem = () => setItems([...items, { description: "", qty: 1, rate: 0 }]);
  const removeItem = (i: number) => setItems(items.filter((_, idx) => idx !== i));
  const updateItem = (i: number, field: keyof LineItem, value: string | number) => {
    const updated = [...items];
    (updated[i] as any)[field] = value;
    setItems(updated);
  };

  const subtotal = items.reduce((sum, item) => sum + item.qty * item.rate, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const printInvoice = () => {
    const html = `
<!DOCTYPE html><html><head><title>Invoice ${invoiceNo}</title>
<style>
  body{font-family:Arial,sans-serif;padding:40px;max-width:800px;margin:0 auto;color:#222}
  h1{color:#4f46e5;margin:0} .header{display:flex;justify-content:space-between;margin-bottom:40px}
  .from,.to{white-space:pre-line;font-size:14px;line-height:1.6}
  table{width:100%;border-collapse:collapse;margin:20px 0}
  th{background:#f3f4f6;padding:10px;text-align:left;font-size:13px;border-bottom:2px solid #ddd}
  td{padding:10px;border-bottom:1px solid #eee;font-size:14px}
  .totals{text-align:right;margin-top:20px} .total-row{font-size:18px;font-weight:bold;color:#4f46e5}
  .notes{margin-top:30px;padding:15px;background:#f9fafb;border-radius:8px;font-size:13px}
</style></head><body>
<div class="header">
  <div><h1>INVOICE</h1><p style="color:#888;font-size:13px">#${invoiceNo}</p></div>
  <div style="text-align:right"><p style="font-size:13px">Date: ${date}</p>${dueDate ? `<p style="font-size:13px">Due: ${dueDate}</p>` : ''}</div>
</div>
<div style="display:flex;justify-content:space-between;margin-bottom:30px">
  <div><strong>From:</strong><br/><p class="from">${from}</p></div>
  <div style="text-align:right"><strong>Bill To:</strong><br/><p class="to">${to}</p></div>
</div>
<table><thead><tr><th>Description</th><th>Qty</th><th>Rate</th><th>Amount</th></tr></thead>
<tbody>${items.map(item => `<tr><td>${item.description}</td><td>${item.qty}</td><td>${currency}${item.rate.toFixed(2)}</td><td>${currency}${(item.qty * item.rate).toFixed(2)}</td></tr>`).join("")}</tbody></table>
<div class="totals">
  <p>Subtotal: ${currency}${subtotal.toFixed(2)}</p>
  <p>Tax (10%): ${currency}${tax.toFixed(2)}</p>
  <p class="total-row">Total: ${currency}${total.toFixed(2)}</p>
</div>
${notes ? `<div class="notes"><strong>Notes:</strong> ${notes}</div>` : ''}
</body></html>`;
    const win = window.open("", "_blank");
    if (win) { win.document.write(html); win.document.close(); win.print(); }
    toast.success("Invoice opened for printing/download!");
  };

  const faqs = [
    { question: "Can I download the invoice as PDF?", answer: "Yes! Click 'Print / Download PDF' and use your browser's print dialog to save as PDF." },
    { question: "Is my invoice data saved?", answer: "No data is saved to any server. Everything stays in your browser." },
    { question: "Can I add more line items?", answer: "Yes! Click 'Add Item' to add as many line items as you need." },
    { question: "Does it support different currencies?", answer: "Yes! Change the currency symbol to $ (USD), € (EUR), £ (GBP), or any other symbol." },
  ];

  const toolInterface = (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div>
          <label className="text-sm font-semibold mb-1 block">Invoice #</label>
          <input value={invoiceNo} onChange={e => setInvoiceNo(e.target.value)} className="w-full p-2 border border-border rounded-lg text-sm focus:outline-none" />
        </div>
        <div>
          <label className="text-sm font-semibold mb-1 block">Currency</label>
          <select value={currency} onChange={e => setCurrency(e.target.value)} className="w-full p-2 border border-border rounded-lg text-sm focus:outline-none bg-background">
            {["$", "€", "£", "¥", "₹", "PKR", "AED", "SAR", "AUD", "CAD", "CHF", "SGD"].map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm font-semibold mb-1 block">Date</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full p-2 border border-border rounded-lg text-sm focus:outline-none" />
        </div>
        <div>
          <label className="text-sm font-semibold mb-1 block">Due Date</label>
          <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="w-full p-2 border border-border rounded-lg text-sm focus:outline-none" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-semibold mb-1 block">From</label>
          <textarea value={from} onChange={e => setFrom(e.target.value)} rows={3} className="w-full p-2 border border-border rounded-lg text-sm resize-none focus:outline-none" />
        </div>
        <div>
          <label className="text-sm font-semibold mb-1 block">Bill To</label>
          <textarea value={to} onChange={e => setTo(e.target.value)} rows={3} className="w-full p-2 border border-border rounded-lg text-sm resize-none focus:outline-none" />
        </div>
      </div>

      {/* Line Items */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-semibold">Line Items</label>
        </div>
        <div className="space-y-2">
          {items.map((item, i) => (
            <div key={i} className="grid grid-cols-12 gap-2 items-center">
              <input value={item.description} onChange={e => updateItem(i, "description", e.target.value)} placeholder="Description" className="col-span-6 p-2 border border-border rounded-lg text-sm focus:outline-none" />
              <input type="number" value={item.qty} onChange={e => updateItem(i, "qty", Number(e.target.value))} className="col-span-2 p-2 border border-border rounded-lg text-sm focus:outline-none" />
              <input type="number" value={item.rate} onChange={e => updateItem(i, "rate", Number(e.target.value))} className="col-span-3 p-2 border border-border rounded-lg text-sm focus:outline-none" />
              <button onClick={() => removeItem(i)} className="col-span-1 text-red-400 hover:text-red-600">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <Button onClick={addItem} variant="outline" size="sm" className="mt-2">
          <Plus className="w-4 h-4 mr-2" /> Add Item
        </Button>
      </div>

      {/* Totals */}
      <Card className="p-4 bg-secondary/30 border-0">
        <div className="space-y-1 text-sm">
          <div className="flex justify-between"><span>Subtotal</span><span>{currency}{subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between text-muted-foreground"><span>Tax (10%)</span><span>{currency}{tax.toFixed(2)}</span></div>
          <div className="flex justify-between font-bold text-lg text-primary border-t border-border pt-2 mt-2">
            <span>Total</span><span>{currency}{total.toFixed(2)}</span>
          </div>
        </div>
      </Card>

      <div>
        <label className="text-sm font-semibold mb-1 block">Notes</label>
        <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2} className="w-full p-2 border border-border rounded-lg text-sm resize-none focus:outline-none" />
      </div>

      <Button onClick={printInvoice} className="w-full bg-primary hover:bg-primary/90 text-white" size="lg">
        <Download className="w-4 h-4 mr-2" /> Print / Download PDF
      </Button>
    </div>
  );

  return (
    <ToolPage
      toolName="Invoice Generator"
      toolDescription="Create professional invoices online for free. Add line items, set due dates, apply tax, and download as PDF. No account needed — 100% free invoice maker."
      toolIcon={<Receipt className="w-8 h-8" />}
      category="Utility Tools"
      keywords={["invoice generator", "free invoice maker", "create invoice online", "pdf invoice", "billing tool"]}
      features={["Professional invoice layout", "Add unlimited line items", "Auto-calculate subtotal, tax, and total", "Multiple currency symbols", "Download as PDF", "No data stored"]}
      faqs={faqs}
    >
      {toolInterface}
    </ToolPage>
  );
}
