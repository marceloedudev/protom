package com.github.marceloedudev.infra.database.dao;

import com.github.marceloedudev.domain.dao.OrderDAO;
import com.github.marceloedudev.domain.entity.Order;
import com.github.marceloedudev.domain.entity.OrderItem;
import com.github.marceloedudev.domain.entity.Pagination;
import com.github.marceloedudev.infra.database.base.OrderPanache;
import com.github.marceloedudev.models.panache.OrderModel;
import io.quarkus.panache.common.Page;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@ApplicationScoped
public class OrderDAODatabase implements OrderDAO {

    private OrderPanache orderPanache;

    @Inject
    public OrderDAODatabase(OrderPanache orderPanache) {
        this.orderPanache = orderPanache;
    }

    @Override
    public Optional<Order> findById(Long id) {
        OrderModel orderModel = orderPanache.findById(id);
        if (orderModel == null) {
            return Optional.empty();
        }
        ArrayList<OrderItem> orderItems = orderModel.getOrderItems().stream()
                .map(item -> new OrderItem(item.getId(), item.getPrice(), item.getQuantity()))
                .collect(Collectors.toCollection(ArrayList::new));
        Order order = new Order();
        order.setIdOrder(orderModel.getId());
        order.setItems(orderItems);
        order.setCpf(orderModel.getCpf());
        order.setUserId(orderModel.getUser());
        order.setStatus(orderModel.getStatus());
        return Optional.of(order);
    }

    @Override
    public List<Order> findAll(Long userId, Pagination pagination) {
        List<OrderModel> ordersModel = orderPanache.find("user_id", userId).page(Page.of(pagination.getPage(), pagination.getSize())).stream().toList();
        List<Order> orders = new ArrayList<>();
        ordersModel.stream().forEach(orderModel -> {
            Order order = new Order();
            order.setIdOrder(orderModel.getId());
            order.setUserId(orderModel.getUser());
            order.setCpf(orderModel.getCpf());
            order.setStatus(orderModel.getStatus());
            if (orderModel.getOrderItems() != null) {
                order.setItems(
                        orderModel.getOrderItems()
                                .stream()
                                .map(itemModel -> {
                                    return new OrderItem(itemModel.getItemId(), itemModel.getPrice(), itemModel.getQuantity());
                                })
                                .collect(Collectors.toCollection(ArrayList::new))
                );
            }
            orders.add(order);
        });
        return orders;
    }

    @Override
    public Optional<Order> findByIdAndUser(Long orderId, Long userId) {
        OrderModel orderModel = orderPanache.findByIdAndUser(orderId, userId);
        if (orderModel == null) {
            return Optional.empty();
        }
        ArrayList<OrderItem> orderItems = orderModel.getOrderItems().stream()
                .map(item -> new OrderItem(item.getId(), item.getPrice(), item.getQuantity()))
                .collect(Collectors.toCollection(ArrayList::new));
        Order order = new Order();
        order.setIdOrder(orderModel.getId());
        order.setItems(orderItems);
        order.setCpf(orderModel.getCpf());
        order.setStatus(orderModel.getStatus());
        order.setUserId(order.getUserId());
        return Optional.of(order);
    }
}
