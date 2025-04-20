import { toast } from "sonner";

type ToasterProps = {
    title: string;
    description: string;
};

export function dismissableToaster (props: ToasterProps) {
    toast(
        props.title, {
            description: props.description,
            action: {
                label: "Dismiss",
                onClick: () => {}
            }
        }
    );
}