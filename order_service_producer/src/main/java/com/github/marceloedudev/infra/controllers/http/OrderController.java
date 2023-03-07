package com.github.marceloedudev.infra.controllers.http;

import com.github.marceloedudev.application.commands.CancelOrderCommand;
import com.github.marceloedudev.application.commands.PlaceOrderCommand;
import com.github.marceloedudev.application.dto.*;
import com.github.marceloedudev.application.queries.GetOrderQuery;
import com.github.marceloedudev.application.queries.GetOrdersQuery;
import com.github.marceloedudev.domain.entity.UserLogged;
import com.github.marceloedudev.domain.mappers.PlaceOrderMap;
import com.github.marceloedudev.infra.dto.*;
import io.quarkus.security.Authenticated;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/order-service/v1")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class OrderController implements OrderResource {

    private GetOrderQuery getOrderQuery;
    private GetOrdersQuery getOrdersQuery;
    private PlaceOrderCommand placeOrderCommand;
    private CancelOrderCommand cancelOrderCommand;
    private UserLogged userLogged;

    @Inject
    public OrderController(GetOrderQuery getOrderQuery, GetOrdersQuery getOrdersQuery,
            PlaceOrderCommand placeOrderCommand, CancelOrderCommand cancelOrderCommand, UserLogged userLogged) {
        this.getOrderQuery = getOrderQuery;
        this.getOrdersQuery = getOrdersQuery;
        this.placeOrderCommand = placeOrderCommand;
        this.cancelOrderCommand = cancelOrderCommand;
        this.userLogged = userLogged;
    }

    @Authenticated
    @RolesAllowed({ "role1", "role3" })
    @Override
    public Response placeOrder(PlaceOrderRequest request) {
        this.placeOrderCommand.execute(PlaceOrderMap.requestToInput(userLogged.getUserID(), request));
        PlaceOrderResponse placeOrderOutput = new PlaceOrderResponse("Place order successfully");
        return Response
                .status(Response.Status.CREATED.getStatusCode())
                .entity(placeOrderOutput)
                .build();
    }

    @Authenticated
    @Override
    public Response cancelOrder(Long id) {
        this.cancelOrderCommand.execute(new CancelOrderInput(id));
        CancelOrderResponse cancelOrderOutput = new CancelOrderResponse("Cancel order successfully");
        return Response.ok(cancelOrderOutput).build();
    }

    @Authenticated
    @Override
    public Response getOrder(Long id, Long userId) {
        GetOrderOutput getOrder = getOrderQuery.execute(new GetOrderInput(id, userId));
        GetOrderResponse getOrderResponse = new GetOrderResponse(getOrder.getOrder());
        return Response.ok(getOrderResponse).build();
    }

    @Authenticated
    @Override
    public Response getOrders(Long userId, int page, int size) {
        GetOrdersOutput orders = getOrdersQuery.execute(new GetOrdersInput(userId, page, size));
        GetOrdersResponse getOrdersResponse = new GetOrdersResponse(orders.getOrders());
        return Response.ok(getOrdersResponse).build();
    }

}
