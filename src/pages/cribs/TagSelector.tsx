import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ResponseErrorConfig } from "@/lib/client";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import CalendarComponent from "@/components/ui/CalendarComponent";

type FetchedTag = {
  id?: string;
  name?: string;
  tagCategoryId?: string;
};

type Props = {
  // modal controls (existing)
  open: boolean;
  closeTag: () => void;
  clearTags: () => void;

  // tags (existing)
  tags: string[];
  fetched_tags: FetchedTag[];
  tag_error: ResponseErrorConfig<Error> | null;
  tag_isLoading?: boolean;
  setTags: (tag: string) => void;

  // price controls
  minPrice?: number | null;
  maxPrice?: number | null;
  setPriceRange?: (min: number | null, max: number | null) => void;

  // roommate filtering
  roommatesMin?: number | null;
  roommatesMax?: number | null;
  setRoommatesRange?: (min: number | null, max: number | null) => void;

  //dates
  startDate?: string | null;
  endDate?: string | null;
  setDateRange?: (min: string | null, max: string | null) => void;

  // verification
  verification?: "ANY" | "VERIFIED" | "UNVERIFIED";
  setVerification?: (v: "ANY" | "VERIFIED" | "UNVERIFIED") => void;
};

const Section: React.FC<{
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}> = ({ title, open, onToggle, children }) => {
  return (
    <div className="border-b border-neutral-200">
      <button
        type="button"
        className="w-full flex items-center justify-between py-3"
        onClick={onToggle}
      >
        <span className="text-lg font-semibold">{title}</span>
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${open ? "max-h-[800px] pb-4" : "max-h-0"}`}
      >
        {open && <div className="pt-1">{children}</div>}
      </div>
    </div>
  );
};

const TagSelector: React.FC<Props> = (props) => {
  //open accordian
  const [openTags, setOpenTags] = useState(false);
  const [openPrice, setOpenPrice] = useState(false);
  const [openDates, setOpenDates] = useState(false);
  const [openRoommates, setOpenRoommates] = useState(false);
  const [openVerification, setOpenVerification] = useState(true);

  // Roommates
  const [minRoommates, setMinRoommates] = useState<string>(
    props.roommatesMin?.toString() ?? ""
  );
  const [maxRoommates, setMaxRoommates] = useState<string>(
    props.roommatesMax?.toString() ?? ""
  );
  const applyRoommates = () => {
    const min = minRoommates === "" ? null : Number(minRoommates);
    const max = maxRoommates === "" ? null : Number(maxRoommates);
    props.setRoommatesRange?.(
      isNaN(min as any) ? null : min,
      isNaN(max as any) ? null : max
    );
  };

  // Dates (ISO date inputs)

  const [start, setStart] = useState<string>(props.startDate ?? "");
  const [end, setEnd] = useState<string>(props.endDate ?? "");
  const applyDates = () => {
    const s = start === "" ? null : start;
    const e = end === "" ? null : end;
    props.setDateRange?.(s, e);
  };

  // helper for active button styling
  const isActive = (v: "ANY" | "VERIFIED" | "UNVERIFIED") =>
    (props.verification ?? "any") === v;

  // local controlled inputs for price (to avoid half-updates)
  const [minPrice, setMinPrice] = useState<string>(
    props.minPrice?.toString() ?? ""
  );
  const [maxPrice, setMaxPrice] = useState<string>(
    props.maxPrice?.toString() ?? ""
  );

  const toggle = (
    which: "tags" | "price" | "more" | "dates" | "roommates" | "all"
  ) => {
    if (which === "tags") setOpenTags((v) => !v);
    if (which === "price") setOpenPrice((v) => !v);
    if (which === "dates") setOpenDates((v) => !v);
    if (which === "roommates") setOpenRoommates((v) => !v);
    if (which === "all") {
      setOpenDates(false);
      setOpenPrice(false);
      setOpenTags(false);
      setOpenRoommates(false);
    }
  };

  const categorized = useMemo(() => {
    const list = (props.fetched_tags ?? []).filter(
      (t) => t?.name && t?.tagCategoryId
    ) as { name: string; tagCategoryId: string }[];
    const by = (key: string) => list.filter((t) => t.tagCategoryId === key);
    return {
      property: by("property"),
      lease: by("lease"),
      room: by("room"),
      preferences: by("preferences"),
      amenities: by("amenities"),
    };
  }, [props.fetched_tags]);

  const applyPrice = () => {
    if (!props.setPriceRange) return; // optional
    const min = minPrice.trim() === "" ? null : Number(minPrice);
    const max = maxPrice.trim() === "" ? null : Number(maxPrice);
    props.setPriceRange(
      Number.isNaN(min as number) ? null : min,
      Number.isNaN(max as number) ? null : max
    );
  };

  const clearAll = () => {
    props.clearTags();
    setMinPrice("");
    setMaxPrice("");
    setMaxRoommates("10");
    setMinRoommates("0");
    if (props.setPriceRange) props.setPriceRange(null, null);
  };

  useEffect(() => {
    console.log(end);
    console.log(start);
  }, [end, start]);

  return (
    <>
      <div
        className={`${
          props.open
            ? "max-w-[600px] absolute top-16 left-1/2 -translate-x-1/2 w-full flex justify-center z-20"
            : "hidden"
        }`}
      >
        <div className="w-[95%] rounded-xl shadow-2xl bg-white">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-neutral-200">
            <div className="text-2xl font-semibold">Filters</div>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                className="h-8 px-2 text-neutral-700"
                onClick={clearAll}
              >
                Clear All
              </Button>
              <Button
                variant="secondary"
                className="h-8 px-3"
                onClick={props.closeTag}
              >
                <X className="mr-1 h-4 w-4" /> Close
              </Button>
            </div>
          </div>

          {/* Body (scrollable if overflow) */}
          <div className="max-h-[70vh] overflow-y-auto px-4">
            {/* Loading / Error */}
            {props.tag_isLoading && (
              <div className="flex items-center justify-center w-full py-6">
                <span>Loading…</span>
              </div>
            )}
            {props.tag_error && !props.tag_isLoading ? (
              <div className="flex items-center justify-center w-full py-6">
                <span>Error loading tags</span>
              </div>
            ) : null}
            <Section
              title="Verification"
              open={openVerification}
              onToggle={() => setOpenVerification((v) => !v)}
            >
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => props.setVerification?.("ANY")}
                  className={`h-9 px-3 rounded-full border text-sm
        ${isActive("ANY") ? "bg-black text-white border-black" : "bg-white border-neutral-300 text-neutral-800"}`}
                  aria-pressed={isActive("ANY")}
                >
                  Any
                </button>

                <button
                  type="button"
                  onClick={() => props.setVerification?.("VERIFIED")}
                  className={`h-9 px-3 rounded-full border text-sm
        ${isActive("VERIFIED") ? "bg-black text-white border-black" : "bg-white border-neutral-300 text-neutral-800"}`}
                  aria-pressed={isActive("VERIFIED")}
                >
                  Verified
                </button>

                <button
                  type="button"
                  onClick={() => props.setVerification?.("UNVERIFIED")}
                  className={`h-9 px-3 rounded-full border text-sm
        ${isActive("UNVERIFIED") ? "bg-black text-white border-black" : "bg-white border-neutral-300 text-neutral-800"}`}
                  aria-pressed={isActive("UNVERIFIED")}
                >
                  Unverified
                </button>
              </div>

              <p className="mt-3 text-xs text-neutral-600">
                “Verified” shows listings we’ve checked (student status +
                listing details). “Unverified” shows everything else. “Any”
                shows both.
              </p>
            </Section>
            {/* TAGS */}
            <Section
              title="Tags"
              open={openTags}
              onToggle={() => toggle("tags")}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Property Types */}
                <div>
                  <div className="text-sm font-semibold mb-2">
                    Property Types
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {categorized.property.map((tag) => (
                      <Badge
                        key={`prop-${tag.name}`}
                        className="cursor-pointer rounded-full"
                        variant={
                          props.tags.includes(tag.name) ? "default" : "outline"
                        }
                        onClick={() => props.setTags(tag.name)}
                      >
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Lease Types */}
                <div>
                  <div className="text-sm font-semibold mb-2">Lease Types</div>
                  <div className="flex flex-wrap gap-2">
                    {categorized.lease.map((tag) => (
                      <Badge
                        key={`lease-${tag.name}`}
                        className="cursor-pointer rounded-full"
                        variant={
                          props.tags.includes(tag.name) ? "default" : "outline"
                        }
                        onClick={() => props.setTags(tag.name)}
                      >
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Room Types */}
                <div>
                  <div className="text-sm font-semibold mb-2">Room Types</div>
                  <div className="flex flex-wrap gap-2">
                    {categorized.room.map((tag) => (
                      <Badge
                        key={`room-${tag.name}`}
                        className="cursor-pointer rounded-full"
                        variant={
                          props.tags.includes(tag.name) ? "default" : "outline"
                        }
                        onClick={() => props.setTags(tag.name)}
                      >
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Preferences */}
                <div>
                  <div className="text-sm font-semibold mb-2">Preferences</div>
                  <div className="flex flex-wrap gap-2">
                    {categorized.preferences.map((tag) => (
                      <Badge
                        key={`pref-${tag.name}`}
                        className="cursor-pointer rounded-full"
                        variant={
                          props.tags.includes(tag.name) ? "default" : "outline"
                        }
                        onClick={() => props.setTags(tag.name)}
                      >
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div className="sm:col-span-2">
                  <div className="text-sm font-semibold mb-2">Amenities</div>
                  <div className="flex flex-wrap gap-2">
                    {categorized.amenities.map((tag) => (
                      <Badge
                        key={`amen-${tag.name}`}
                        className="cursor-pointer rounded-full"
                        variant={
                          props.tags.includes(tag.name) ? "default" : "outline"
                        }
                        onClick={() => props.setTags(tag.name)}
                      >
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Section>

            {/* PRICE */}
            <Section
              title="Price"
              open={openPrice}
              onToggle={() => toggle("price")}
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-sm text-neutral-600 mb-1">
                    Min ($/mo)
                  </div>
                  <Input
                    inputMode="numeric"
                    placeholder="e.g. 500"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    onBlur={applyPrice}
                  />
                </div>
                <div>
                  <div className="text-sm text-neutral-600 mb-1">
                    Max ($/mo)
                  </div>
                  <Input
                    inputMode="numeric"
                    placeholder="e.g. 1500"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    onBlur={applyPrice}
                  />
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <Button variant="secondary" onClick={applyPrice}>
                  Apply
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setMinPrice("");
                    setMaxPrice("");
                    if (props.setPriceRange) props.setPriceRange(null, null);
                  }}
                >
                  Clear
                </Button>
              </div>
            </Section>

            {/* ROOMMATES */}
            <Section
              title="Roommates"
              open={openRoommates}
              onToggle={() => toggle("roommates")}
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-sm text-neutral-600 mb-1">Min</div>
                  <Input
                    inputMode="numeric"
                    placeholder="e.g. 1"
                    value={minRoommates}
                    onChange={(e) => setMinRoommates(e.target.value)}
                    onBlur={applyRoommates}
                  />
                </div>
                <div>
                  <div className="text-sm text-neutral-600 mb-1">Max</div>
                  <Input
                    inputMode="numeric"
                    placeholder="e.g. 3"
                    value={maxRoommates}
                    onChange={(e) => setMaxRoommates(e.target.value)}
                    onBlur={applyRoommates}
                  />
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <Button variant="secondary" onClick={applyRoommates}>
                  Apply
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setMinRoommates("");
                    setMaxRoommates("");
                    props.setRoommatesRange?.(null, null);
                  }}
                >
                  Clear
                </Button>
              </div>
            </Section>

            {/* DATES */}
            <Section
              title="Dates"
              open={openDates}
              onToggle={() => toggle("dates")}
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-sm text-neutral-600 mb-1">Start</div>
                  <CalendarComponent
                    value={start ? new Date(start) : undefined}
                    onChange={(d) => {
                      // store as YYYY-MM-DD (what your backend expects)
                      setStart(d ? d.toISOString() : "");
                    }}
                  />
                </div>
                <div>
                  <div className="text-sm text-neutral-600 mb-1">End</div>
                  <CalendarComponent
                    value={end ? new Date(end) : undefined}
                    onChange={(d) => {
                      setEnd(d ? d.toISOString() : "");
                    }}
                  />
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <Button variant="secondary" onClick={applyDates}>
                  Apply
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setStart("");
                    setEnd("");
                    props.setDateRange?.(null, null);
                  }}
                >
                  Clear
                </Button>
              </div>

              <p className="mt-3 text-xs text-neutral-600">
                Pick a move-in window. Leave either field blank to filter with
                only one bound.
              </p>
            </Section>
          </div>

          {/* Footer */}
          <div className="p-4 flex items-center justify-end gap-2">
            <Button
              variant="ghost"
              onClick={() => {
                clearAll();
                toggle("all");
              }}
            >
              Reset
            </Button>
            <Button onClick={props.closeTag}>Done</Button>
          </div>
        </div>
      </div>

      {props.open && (
        <div
          className="fixed inset-0 bg-black/50 z-10"
          onClick={props.closeTag}
        />
      )}
    </>
  );
};

export default TagSelector;
