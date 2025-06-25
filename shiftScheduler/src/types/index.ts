declare namespace shiftScheduler {
    interface Engineer {
        id: string;
        name: string;
        Team: {
            Name: string;
        };
    }

    interface ShiftAssignment {
        id: string;
        Date: string;
        engineerId: string;
        shift: string;
        Status?: string;
        Type?: string;
        Role?: string;
    }
}

declare namespace mendix {
    namespace lib {
        interface MxObject {
            getGuid(): string;
            get(attribute: string): any;
            set(attribute: string, value: any): void;
        }
    }
}

declare let mx: {
    data: {
        get: (options: { xpath: string; callback: (objects: any[]) => void }) => void;
    };
};
