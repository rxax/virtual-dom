/**
 *
 * Render and mount
 */
import render from "./render";
import mount from "./mount";

export const start = (top_node, mount_point_id) => {
    const rendered_app = render(top_node);
    mount(rendered_app, document.getElementById(mount_point_id));
}