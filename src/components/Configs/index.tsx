import { Card } from "flowbite-react";
import ListHabitos from "./components/ListHabitos";
import SystemConfigs from "./components/SystemConfigs";

export default function Configs() {

    return (<>
        <Card className="mb-2">
            <SystemConfigs />
        </Card>
        <Card className="mb-2">
            <ListHabitos />
        </Card>
    </>)
}
