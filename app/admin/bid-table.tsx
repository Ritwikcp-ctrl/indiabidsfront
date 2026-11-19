"use client"

import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  removeListing,
  resetStore,
  useListings,
} from "@/components/ui/lib/leaderboard-store"
import { formatInr } from "@/components/ui/lib/money"

export function BidTable() {
  const listings = useListings()

  function handleRemove(id: string, title: string) {
    if (
      !window.confirm(
        `Remove "${title}" from the board? This cannot be undone.`
      )
    )
      return
    removeListing(id)
    toast.success(`Removed ${title}`)
  }

  function handleReset() {
    if (!confirm("Reset to demo data? All current bids will be erased.")) return
    resetStore()
    toast.success("Store reset to mock data")
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">All bids</CardTitle>
        <Button variant="outline" size="sm" onClick={handleReset}>
          Reset store
        </Button>
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12 pl-6">#</TableHead>
              <TableHead>Listing</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-right">Today</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-24 pr-6 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {listings.map((l) => (
              <TableRow key={l.id}>
                <TableCell className="pl-6 font-black tabular-nums text-muted-foreground">
                  {l.rank}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{l.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {l.url}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{l.category}</Badge>
                </TableCell>
                <TableCell className="text-right font-semibold tabular-nums">
                  {formatInr(l.totalPaidInr)}
                </TableCell>
                <TableCell className="text-right tabular-nums text-sm">
                  {l.todayDeltaInr > 0 ? `+${formatInr(l.todayDeltaInr)}` : "—"}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {new Date(l.createdAt).toLocaleDateString("en-IN")}
                </TableCell>
                <TableCell className="pr-6 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleRemove(l.id, l.title)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {listings.length === 0 && (
          <p className="p-6 text-center text-sm text-muted-foreground">
            No bids yet.
          </p>
        )}
      </CardContent>
    </Card>
  )
}