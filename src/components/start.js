/**
 *
 * Render and mount
 */
import mount from "./mount";

export const start = (top_node, mount_point_id) => {
    const mount_point = document.getElementById(mount_point_id);

    if (!mount_point) {
        return null;
    }

    return mount(top_node, mount_point);
};