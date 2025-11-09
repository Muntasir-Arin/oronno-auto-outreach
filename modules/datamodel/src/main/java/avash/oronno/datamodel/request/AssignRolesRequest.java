package avash.oronno.datamodel.request;

import java.util.List;

public class AssignRolesRequest {
    
    private List<Long> roleIds;

    public List<Long> getRoleIds() {
        return roleIds;
    }

    public void setRoleIds(List<Long> roleIds) {
        this.roleIds = roleIds;
    }
}

