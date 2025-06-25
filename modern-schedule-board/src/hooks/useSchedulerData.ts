import { useState, useEffect, useMemo } from "react";
import { ListValue, ObjectItem, ListAttributeValue } from "mendix";
import { SchedulerItem, SchedulerResource } from "../types/SchedulerTypes";

interface UseSchedulerDataProps {
    dataSource: ListValue;
    resourcesSource: ListValue;
    startDateAttribute: ListAttributeValue<Date>;
    endDateAttribute: ListAttributeValue<Date>;
    titleAttribute: ListAttributeValue<string>;
    resourceIdAttribute: ListAttributeValue<string>;
}

export const useSchedulerData = ({
    dataSource,
    resourcesSource,
    startDateAttribute,
    endDateAttribute,
    titleAttribute,
    resourceIdAttribute
}: UseSchedulerDataProps) => {
    const [items, setItems] = useState<SchedulerItem[]>([]);
    const [resources, setResources] = useState<SchedulerResource[]>([]);
    const [loading, setLoading] = useState(true);

    // Transform Mendix data to scheduler items
    const transformedItems = useMemo(() => {
        if (dataSource.status !== "available" || !dataSource.items) {
            return [];
        }

        return dataSource.items.map((item: ObjectItem) => {
            const startDate = startDateAttribute.get(item).value;
            const endDate = endDateAttribute.get(item).value;
            const title = titleAttribute.get(item).value;
            const resourceId = resourceIdAttribute.get(item).value;

            return {
                id: item.id,
                title: title || "Untitled",
                start: startDate || new Date(),
                end: endDate || new Date(),
                resourceId: resourceId?.toString() || "",
                mendixObject: item
            } as SchedulerItem;
        });
    }, [dataSource, startDateAttribute, endDateAttribute, titleAttribute, resourceIdAttribute]);

    // Transform Mendix data to scheduler resources
    const transformedResources = useMemo(() => {
        if (resourcesSource.status !== "available" || !resourcesSource.items) {
            return [];
        }

        return resourcesSource.items.map(
            (item: ObjectItem) =>
                ({
                    id: item.id,
                    title: item.id, // You might want to add a title attribute for resources
                    mendixObject: item
                } as SchedulerResource)
        );
    }, [resourcesSource]);

    useEffect(() => {
        setItems(transformedItems);
        setLoading(dataSource.status === "loading");
    }, [transformedItems, dataSource.status]);

    useEffect(() => {
        setResources(transformedResources);
    }, [transformedResources]);

    const updateItem = (itemId: string, updates: Partial<SchedulerItem>) => {
        setItems(prev => prev.map(item => (item.id === itemId ? { ...item, ...updates } : item)));
    };

    const getItemById = (id: string): SchedulerItem | undefined => {
        return items.find(item => item.id === id);
    };

    const getResourceById = (id: string): SchedulerResource | undefined => {
        return resources.find(resource => resource.id === id);
    };

    return {
        items,
        resources,
        loading,
        updateItem,
        getItemById,
        getResourceById
    };
};
